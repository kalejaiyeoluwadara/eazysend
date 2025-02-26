"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskListPreviewProps } from "../models/Task";
import CopyButton from "./CopyButton";
import { toast } from "sonner";



export const TaskListPreview = ({ taskData }: TaskListPreviewProps) => {
    const [copied, setCopied] = useState(false);

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const suffix = ["th", "st", "nd", "rd"][
            day % 10 > 3 ? 0 : (day % 100) - (day % 10) != 10 ? day % 10 : 0
        ];

        return `${day}${suffix} ${month}, ${year}`;
    };

    // Create formatted text for clipboard
    const getFormattedText = () => {
        return `Date: ${formatDate(taskData.date)}
        Team Member: ${taskData.teamMember}
        ${taskData.tasks}`;
    };

    // Handle copy to clipboard
    const handleCopy = async () => {
        const text = getFormattedText();

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);

            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Card className="w-full relative">
            <CopyButton copied={copied} handleCopy={handleCopy} />
            <CardContent className="p-6">
                <div className="prose max-w-none">
                    <div className="mb-4">
                        <p className="">Date: {formatDate(taskData.date)}</p>
                        <p className="">Team Member: {taskData.teamMember}</p>
                    </div>
                    <div className="whitespace-pre-line">
                        {taskData.tasks.split("\n").map((task, index) => (
                            <p key={index} className="mb-1">
                                {task}
                            </p>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};