"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TeamMemberModal } from "./TeamMemberModal";
import { User, Edit2 } from "lucide-react";
import { TaskFormProps, TaskListData } from "../models/Task";



export const TaskForm = ({ onSubmit }: TaskFormProps) => {
    const [formData, setFormData] = useState<TaskListData>({
        date: new Date().toISOString().split('T')[0],
        teamMember: "",
        tasks: "",
    });
    const [showModal, setShowModal] = useState(false);

    // Effect to load team member name from localStorage on initial load
    useEffect(() => {
        const savedTeamMember = localStorage.getItem("teamMemberName");
        if (savedTeamMember) {
            setFormData(prev => ({ ...prev, teamMember: savedTeamMember }));
        }
    }, []);

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

    const handleTeamMemberSave = (name: string) => {
        setFormData(prev => ({ ...prev, teamMember: name }));
    };

    const openChangeTeamMemberModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <motion.form layout onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2 items-center">
                    <p className="text-base">
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
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium flex items-center gap-1">
                            <User size={16} />
                            <span>Team Member</span>
                        </Label>
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={openChangeTeamMemberModal}
                            size="sm"
                            className="h-6 px-2 text-xs"
                        >
                            <Edit2 size={12} className="mr-1" />
                            Change
                        </Button>
                    </div>
                    <div className="p-2 border rounded-md bg-gray-50">
                        <p className="text-sm">{formData.teamMember || "Not set"}</p>
                    </div>
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

            {/* Team Member Modal */}
            {showModal && (
                <TeamMemberModal
                    onSave={(name) => {
                        handleTeamMemberSave(name);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};