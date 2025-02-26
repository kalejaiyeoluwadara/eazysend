"use client";
import { useState } from "react";
import { EmailForm } from "./components/EmailsForm";
import { EmailPreview } from "./components/EmailPreview";
import { EmailFormData } from "./models/IEmail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListTodo, Mail } from "lucide-react";
import { TaskForm } from "./components/TaskForm";
import { SavedTasksList } from "./components/SavedTaskList";
import { TaskListPreview } from "./components/TaskList";
import { TaskListData } from "./models/Task";
import { Toaster } from 'sonner';
import UserAvatar from "./components/UserAvatar";
import Logo from "./components/Logo";

export default function Home() {
  const [emailData, setEmailData] = useState<EmailFormData | null>(null);
  const [taskData, setTaskData] = useState<TaskListData | null>(null);
  const [activity, setActivity] = useState<'email' | 'tasklist'>('email');

  const handleEmailSubmit = (data: EmailFormData) => {
    setEmailData(data);
  };

  const handleTaskSubmit = (data: TaskListData) => {
    setTaskData(data);

    // Save to localStorage
    const existingTasks = localStorage.getItem("taskLists");
    const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

    // Add new task to array
    tasksArray.unshift(data);

    // Keep only the latest 20 tasks to avoid localStorage limits
    const limitedTasks = tasksArray.slice(0, 20);

    localStorage.setItem("taskLists", JSON.stringify(limitedTasks));
  };

  const handleTaskSelect = (task: TaskListData) => {
    setTaskData(task);
  };

  return (
    <main className="min-h-screen w-full flex flex-col px-12 py-8 bg-white">
      <Toaster />
      <div className="w-full flex items-start justify-between mb-4 ">
        <Logo />
        <UserAvatar />
      </div>

      <Tabs
        defaultValue="email"
        onValueChange={(value) => setActivity(value as 'email' | 'tasklist')}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="tasklist" className="flex items-center gap-2">
            <ListTodo size={16} />
            <span>Task List</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white w-full p-6 rounded-lg shadow-sm border">
              <EmailForm onSubmit={handleEmailSubmit} />
            </div>

            <div className="overflow-hidden">
              {emailData && <EmailPreview emailData={emailData} />}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasklist">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white w-full p-6 rounded-lg shadow-sm border">
              <TaskForm onSubmit={handleTaskSubmit} />
              <SavedTasksList onSelect={handleTaskSelect} />
            </div>

            <div className="overflow-hidden flex flex-col">
              {taskData && <TaskListPreview taskData={taskData} />}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}