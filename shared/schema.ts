import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  completed: true,
});

export const updateTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  completed: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export interface IStorage {
  // Task methods
  getAllTasks(): Promise<Task[]>;
  getTask(id: string | number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string | number, task: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: string | number): Promise<boolean>;
}