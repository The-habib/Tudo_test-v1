import { Router } from "express";
import { getAuth } from "@clerk/express";
import { db } from "@workspace/db";
import { projectsTable, tasksTable, insertProjectSchema } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const projects = await db.select().from(projectsTable).where(eq(projectsTable.userId, userId)).orderBy(desc(projectsTable.createdAt));
  const allTasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, userId));
  const result = projects.map((p) => {
    const projectTasks = allTasks.filter((t) => t.projectId === p.id);
    const completed = projectTasks.filter((t) => t.completed).length;
    return { ...p, totalTasks: projectTasks.length, completedTasks: completed };
  });
  return res.json(result);
});

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const parsed = insertProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [project] = await db.insert(projectsTable).values({ ...parsed.data, userId }).returning();
  return res.status(201).json({ ...project, totalTasks: 0, completedTasks: 0 });
});

router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  await db.delete(projectsTable).where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)));
  return res.json({ ok: true });
});

export default router;
