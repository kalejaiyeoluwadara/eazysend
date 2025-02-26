// SavedTasksList.tsx
"use client";

import { useEffect, useState } from "react";
import { TaskListData } from "./TaskForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface SavedTasksListProps {
    onSelect: (task: TaskListData) => void;
}

export const SavedTasksList = ({ onSelect }: SavedTasksListProps) => {
    const [savedTasks, setSavedTasks] = useState<TaskListData[]>([]);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const tasks = localStorage.getItem("taskLists");
        if (tasks) {
            setSavedTasks(JSON.parse(tasks));
        }
    }, []);

    const handleDelete = (id: string) => {
        const updatedTasks = savedTasks.filter(task => task.id !== id);
        setSavedTasks(updatedTasks);
        localStorage.setItem("taskLists", JSON.stringify(updatedTasks));
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    };

    if (savedTasks.length === 0) {
        return null;
    }

    return (
        <div className="mt-6">
            <h3 className="font-medium mb-2">Previous Task Lists</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {savedTasks.map((task) => (
                    <Card key={task.id} className="p-3 flex justify-between items-center">
                        <div className="flex-1">
                            <p className="font-medium">{task.teamMember} - {formatDate(task.date)}</p>
                            <p className="text-sm text-gray-500 truncate">{task.tasks.split('\n')[0]}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onSelect(task)}
                            >
                                View
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(task.id as string)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};