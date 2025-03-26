import mongoose, { Schema, Document } from 'mongoose';
import { Task } from '@shared/schema';

// Define the Task document interface that extends both Document and Task
export interface TaskDocument extends Document, Omit<Task, 'id'> {
  // MongoDB _id will be mapped to our id field
}

// Create the Task schema
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  // Add timestamps automatically
  timestamps: true
});

// Create and export the Task model
export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);