import { ClipboardList } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <ClipboardList className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">TaskMaster</h1>
        </div>
        <div>
          <span className="text-sm text-gray-500">Task Management App</span>
        </div>
      </div>
    </header>
  );
}
