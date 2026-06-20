import { Router } from "express";
import { getAuth } from "@clerk/express";
import { db } from "@workspace/db";
import { goalsTable, insertGoalSchema } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const goals = await db.select().from(goalsTable).where(eq(goalsTable.userId, userId)).orderBy(desc(goalsTable.createdAt));
  return res.json(goals);
});

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const parsed = insertGoalSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [goal] = await db.insert(goalsTable).values({ ...parsed.data, userId }).returning();
  return res.status(201).json(goal);
});

router.patch("/:id/toggle", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  const [goal] = await db.select().from(goalsTable).where(and(eq(goalsTable.id, id), eq(goalsTable.userId, userId)));
  if (!goal) return res.status(404).json({ error: "Not found" });
  const [updated] = await db.update(goalsTable).set({ completed: !goal.completed, abandoned: false }).where(eq(goalsTable.id, id)).returning();
  return res.json(updated);
});

router.patch("/:id/abandon", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  const [goal] = await db.select().from(goalsTable).where(and(eq(goalsTable.id, id), eq(goalsTable.userId, userId)));
  if (!goal) return res.status(404).json({ error: "Not found" });
  const [updated] = await db.update(goalsTable).set({ abandoned: !goal.abandoned, completed: false }).where(eq(goalsTable.id, id)).returning();
  return res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  await db.delete(goalsTable).where(and(eq(goalsTable.id, id), eq(goalsTable.userId, userId)));
  return res.json({ ok: true });
});

export default router;
