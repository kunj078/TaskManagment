import { Task } from "@shared/schema";
import { Check, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}: TaskCardProps) {
  const { title, description, completed } = task;

  return (
    <div className="task-card bg-white p-4 rounded-lg shadow border border-gray-200 transition-all hover:translate-y-[-2px] hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <button 
            onClick={onToggleComplete}
            className={cn(
              "task-complete-toggle w-5 h-5 rounded-full border-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              completed 
                ? "border-success bg-success" 
                : "border-gray-300 hover:border-primary"
            )}
          >
            {completed && (
              <Check className="h-3 w-3 text-white" />
            )}
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            className={cn(
              "text-base font-medium text-gray-900 task-title",
              completed && "line-through text-gray-500"
            )}
          >
            {title}
          </h3>
          <p 
            className={cn(
              "mt-1 text-sm text-gray-500 task-description",
              completed && "line-through"
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onEdit}
            className="edit-task-btn p-1 rounded-md hover:bg-gray-100"
            aria-label="Edit task"
          >
            <Pencil className="h-5 w-5 text-gray-500" />
          </button>
          <button 
            onClick={onDelete}
            className="delete-task-btn p-1 rounded-md hover:bg-gray-100"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
