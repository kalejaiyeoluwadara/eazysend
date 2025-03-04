import React from 'react'
import Image from "next/image";
import outlook from "@/public/outlook.svg";
import Link from "next/link";

function Logo() {
    return (
        <div className="flex gap-3">
            <Link target='_blank' href={"https://outlook.office365.com/mail/"}>
                <Image alt="outlook" className="h-8 w-8" src={outlook} />
            </Link>
            <h1 className="text-2xl font-bold mb-8">EazySend</h1>
        </div>
    )
}

export default Logo