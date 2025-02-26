// TaskListPreview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TaskListData } from "./TaskForm";

interface TaskListPreviewProps {
    taskData: TaskListData;
}
export const TaskListPreview = ({ taskData }: TaskListPreviewProps) => {
    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10 ? day % 10 : 0)];

        return `${day}${suffix} ${month}, ${year}`;
    };

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="prose max-w-none">
                    <div className="mb-4">
                        <p className="">Date: {formatDate(taskData.date)}</p>
                        <p className="">Team Member: {taskData.teamMember}</p>
                    </div>
                    <div className="whitespace-pre-line">
                        {taskData.tasks.split('\n').map((task, index) => (
                            <p key={index} className="mb-1">{task}</p>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};