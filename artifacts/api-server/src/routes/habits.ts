import { Router } from "express";
import { getAuth } from "@clerk/express";
import { db } from "@workspace/db";
import { habitsTable, habitLogsTable, insertHabitSchema } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const today = new Date().toISOString().split("T")[0];
  const habits = await db.select().from(habitsTable).where(eq(habitsTable.userId, userId)).orderBy(desc(habitsTable.createdAt));
  const logs = await db.select().from(habitLogsTable).where(and(eq(habitLogsTable.userId, userId), eq(habitLogsTable.logDate, today)));
  const loggedHabitIds = new Set(logs.map((l) => l.habitId));
  return res.json(habits.map((h) => ({ ...h, doneToday: loggedHabitIds.has(h.id) })));
});

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const parsed = insertHabitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [habit] = await db.insert(habitsTable).values({ ...parsed.data, userId }).returning();
  return res.status(201).json(habit);
});

router.patch("/:id/toggle", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  const today = new Date().toISOString().split("T")[0];
  const [habit] = await db.select().from(habitsTable).where(and(eq(habitsTable.id, id), eq(habitsTable.userId, userId)));
  if (!habit) return res.status(404).json({ error: "Not found" });
  const [existing] = await db.select().from(habitLogsTable).where(and(eq(habitLogsTable.habitId, id), eq(habitLogsTable.userId, userId), eq(habitLogsTable.logDate, today)));
  if (existing) {
    await db.delete(habitLogsTable).where(eq(habitLogsTable.id, existing.id));
    const [updated] = await db.update(habitsTable).set({ streakDays: Math.max(0, habit.streakDays - 1) }).where(eq(habitsTable.id, id)).returning();
    return res.json({ ...updated, doneToday: false });
  } else {
    await db.insert(habitLogsTable).values({ habitId: id, userId, logDate: today });
    const [updated] = await db.update(habitsTable).set({ streakDays: habit.streakDays + 1 }).where(eq(habitsTable.id, id)).returning();
    return res.json({ ...updated, doneToday: true });
  }
});

router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  await db.delete(habitsTable).where(and(eq(habitsTable.id, id), eq(habitsTable.userId, userId)));
  return res.json({ ok: true });
});

export default router;
