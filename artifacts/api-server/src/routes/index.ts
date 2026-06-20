import { Router, type IRouter } from "express";
import healthRouter from "./health";
import habitsRouter from "./habits";
import tasksRouter from "./tasks";
import projectsRouter from "./projects";
import goalsRouter from "./goals";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/habits", habitsRouter);
router.use("/tasks", tasksRouter);
router.use("/projects", projectsRouter);
router.use("/goals", goalsRouter);

export default router;
