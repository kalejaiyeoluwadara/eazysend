"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface TaskListData {
    date: string;
    teamMember: string;
    tasks: string;
    id?: string;

}

interface TaskFormProps {
    onSubmit: (data: TaskListData) => void;
}

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
    const [formData, setFormData] = useState<TaskListData>({
        date: new Date().toISOString().split('T')[0],
        teamMember: "",
        tasks: "",
    });

    const handleTasksChange = (value: string) => {
        const formattedTasks = formatTasksList(value);
        setFormData({ ...formData, tasks: formattedTasks });
    };

    const formatTasksList = (text: string) => {
        return text
            .split("\n")
            .map((line, index) => {
                // Remove existing numbers and dots if present
                const cleanLine = line.replace(/^\d+\.\s*/, "").trim();
                // Skip empty lines
                if (!cleanLine) return "";
                // Add number formatting
                return `${index + 1}.${cleanLine}`;
            })
            .filter(line => line) // Remove empty lines
            .join("\n");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const lines = formData.tasks.split("\n");
            const currentLineIndex = lines.length;
            const newLine = `${currentLineIndex + 1}.`;
            setFormData({
                ...formData,
                tasks: formData.tasks ? formData.tasks + "\n" + newLine : newLine
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Generate a unique ID for storage
        const taskData = {
            ...formData,
            id: Date.now().toString()
        };
        onSubmit(taskData);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        // Add suffix to day
        const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10 ? day % 10 : 0)];

        return `${day}${suffix} ${month}, ${year}`;
    };

    return (
        <motion.form layout onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 items-center ">
                <p className="text-base ">
                    {formatDate(formData.date)}
                </p>
                <div>
                    <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                        }}
                        required
                    />
                </div>

            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium">Team Member</Label>
                <Input
                    value={formData.teamMember}
                    onChange={(e) => setFormData({ ...formData, teamMember: e.target.value })}
                    placeholder="e.g., Dara"
                    required
                />
            </div>

            <div className="space-y-2 relative">
                <Label className="text-sm font-medium">Tasks Completed</Label>
                <Textarea
                    value={formData.tasks}
                    onChange={(e) => handleTasksChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Press Enter to add a new numbered task"
                    required
                    rows={4}
                />

                {formData.tasks && formData.tasks.trim() !== "" && (
                    <Button
                        variant={"ghost"}
                        type="button"
                        onClick={() => setFormData({ ...formData, tasks: "" })}
                        className="text-sm absolute -top-3 right-2 text-red-500 hover:text-red-700 transition"
                    >
                        Clear
                    </Button>
                )}
            </div>

            <Button type="submit" className="w-full">
                Generate Task List
            </Button>
        </motion.form>
    );
};