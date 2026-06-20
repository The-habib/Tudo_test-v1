import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const goalsTable = pgTable("goals", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  icon: text("icon").notNull().default("Target"),
  completed: boolean("completed").notNull().default(false),
  abandoned: boolean("abandoned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGoalSchema = createInsertSchema(goalsTable).omit({ id: true, userId: true, completed: true, abandoned: true, createdAt: true });

export type Goal = typeof goalsTable.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
