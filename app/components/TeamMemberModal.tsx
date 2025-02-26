// TeamMemberModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface TeamMemberModalProps {
    onSave: (name: string) => void;
}

export const TeamMemberModal = ({ onSave }: TeamMemberModalProps) => {
    const [open, setOpen] = useState(false);
    const [teamMember, setTeamMember] = useState("");

    // Check if team member name exists in localStorage when component mounts
    useEffect(() => {
        const savedTeamMember = localStorage.getItem("teamMemberName");
        if (!savedTeamMember) {
            setOpen(true);
        } else {
            onSave(savedTeamMember);
        }
    }, [onSave]);

    const handleSave = () => {
        if (teamMember.trim()) {
            localStorage.setItem("teamMemberName", teamMember);
            onSave(teamMember);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User size={18} />
                        <span>Set Your Name</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Enter your name once, and we'll remember it for all your future task lists.
                    </p>
                    <div className="space-y-2">
                        <Label htmlFor="team-member-name">Team Member Name</Label>
                        <Input
                            id="team-member-name"
                            value={teamMember}
                            onChange={(e) => setTeamMember(e.target.value)}
                            placeholder="e.g., Dara"
                            autoFocus
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} disabled={!teamMember.trim()}>
                        Save Name
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};