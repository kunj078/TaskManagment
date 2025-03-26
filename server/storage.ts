import { tasks, type Task, type InsertTask, type UpdateTask } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";
import mongoose from 'mongoose';
import { TaskModel, TaskDocument } from './models/task';

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Task methods
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasks: Map<number, Task>;
  private userCurrentId: number;
  private taskCurrentId: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.userCurrentId = 1;
    this.taskCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Task methods implementation
  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskCurrentId++;
    const task: Task = { 
      ...insertTask, 
      id,
      // Ensure description is never undefined
      description: insertTask.description || "",
      // Default completed to false if not provided
      completed: insertTask.completed !== undefined ? insertTask.completed : false
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updateTask: UpdateTask): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) {
      return undefined;
    }

    const updatedTask: Task = {
      ...existingTask,
      ...updateTask,
      // Ensure id isn't overwritten
      id: existingTask.id,
      // Ensure description is never undefined
      description: updateTask.description !== undefined ? updateTask.description : existingTask.description
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

// MongoDB Storage Implementation
export class MongoStorage implements IStorage {
  constructor() {
    // MongoDB connection is handled in server/index.ts
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    // Not implemented for MongoDB in this version
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Not implemented for MongoDB in this version
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    // Not implemented for MongoDB in this version
    throw new Error("MongoDB user creation not implemented");
  }

  // Task methods
  async getAllTasks(): Promise<Task[]> {
    const tasks = await TaskModel.find().lean();
    return tasks.map(task => this.documentToTask(task));
  }

  async getTask(id: number): Promise<Task | undefined> {
    try {
      const task = await TaskModel.findById(id).lean();
      return task ? this.documentToTask(task) : undefined;
    } catch (error) {
      console.error('Error fetching task:', error);
      return undefined;
    }
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const newTask = new TaskModel({
      title: insertTask.title,
      description: insertTask.description || '',
      completed: insertTask.completed !== undefined ? insertTask.completed : false
    });

    const savedTask = await newTask.save();
    return this.documentToTask(savedTask);
  }

  async updateTask(id: number, updateTask: UpdateTask): Promise<Task | undefined> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { $set: updateTask },
        { new: true }
      ).lean();

      return updatedTask ? this.documentToTask(updatedTask) : undefined;
    } catch (error) {
      console.error('Error updating task:', error);
      return undefined;
    }
  }

  async deleteTask(id: number): Promise<boolean> {
    try {
      const result = await TaskModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  // Helper method to convert MongoDB document to Task
  private documentToTask(doc: any): Task {
    return {
      id: doc._id,
      title: doc.title,
      description: doc.description || '',
      completed: doc.completed
    };
  }
}

// Export MongoDB storage instance
export const storage = new MongoStorage();
