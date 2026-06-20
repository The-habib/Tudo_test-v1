import { Router } from "express";
import { getAuth } from "@clerk/express";
import { db } from "@workspace/db";
import { tasksTable, insertTaskSchema } from "@workspace/db";
import { eq, and, desc, isNull } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const today = new Date().toISOString().split("T")[0];
  const tasks = await db.select().from(tasksTable).where(and(eq(tasksTable.userId, userId), eq(tasksTable.taskDate, today), isNull(tasksTable.projectId))).orderBy(tasksTable.scheduledTime);
  return res.json(tasks);
});

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const parsed = insertTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [task] = await db.insert(tasksTable).values({ ...parsed.data, userId }).returning();
  return res.status(201).json(task);
});

router.patch("/:id/toggle", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  const [task] = await db.select().from(tasksTable).where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
  if (!task) return res.status(404).json({ error: "Not found" });
  const [updated] = await db.update(tasksTable).set({ completed: !task.completed }).where(eq(tasksTable.id, id)).returning();
  return res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  await db.delete(tasksTable).where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
  return res.json({ ok: true });
});

export default router;
