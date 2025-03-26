import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Task } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import CreateTaskModal from "@/components/CreateTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (task: Omit<Task, "id">) => 
      apiRequest("POST", "/api/tasks", task),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      setIsCreateModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, ...task }: Task) => 
      apiRequest("PUT", `/api/tasks/${id}`, task),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      setIsEditModalOpen(false);
      setSelectedTask(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest("DELETE", `/api/tasks/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Handler functions
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCreateTask = async (task: Omit<Task, "id">) => {
    await createTaskMutation.mutateAsync(task);
  };

  const handleUpdateTask = async (task: Task) => {
    await updateTaskMutation.mutateAsync(task);
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      await deleteTaskMutation.mutateAsync(selectedTask.id);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await updateTaskMutation.mutateAsync({
      ...task,
      completed: !task.completed,
    });
  };

  // Count incomplete tasks
  const incompleteTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
              <p className="text-sm text-gray-500 mt-1">
                You have <span id="task-counter" className="font-medium">{incompleteTasks}</span> tasks remaining
              </p>
            </div>
            <Button 
              onClick={handleOpenCreateModal}
              className="bg-primary hover:bg-indigo-700 text-white"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Task
            </Button>
          </div>

          <TaskList 
            tasks={tasks} 
            isLoading={isLoading}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
      
      <Footer />

      {/* Modals */}
      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreateTask}
        isPending={createTaskMutation.isPending}
      />

      {selectedTask && (
        <EditTaskModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSubmit={handleUpdateTask}
          task={selectedTask}
          isPending={updateTaskMutation.isPending}
        />
      )}

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteTask}
        isPending={deleteTaskMutation.isPending}
      />
    </div>
  );
}
