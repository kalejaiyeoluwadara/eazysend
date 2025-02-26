import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function UserAvatar() {
    const [teamMemberName, setTeamMemberName] = useState('');

    useEffect(() => {
        const savedTeamMember = localStorage.getItem("teamMemberName");
        if (savedTeamMember) {
            setTeamMemberName(savedTeamMember);
        }
    }, []);

    // Generate initials from the team member name
    const getInitials = (name: string) => {
        if (!name) return "X";

        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div>
            <Avatar>
                <AvatarFallback>{getInitials(teamMemberName)}</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserAvatar