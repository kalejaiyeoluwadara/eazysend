"use client";
import { useState } from "react";
import { EmailForm, EmailFormData } from "./components/EmailsForm";
import { EmailPreview } from "./components/EmailPreview";
import Image from "next/image";
import outlook from "@/public/outlook.svg";
import Link from "next/link";
export default function Home() {
  const [emailData, setEmailData] = useState<EmailFormData | null>(null);

  const handleSubmit = (data: EmailFormData) => {
    setEmailData(data);
  };

  return (
    <main className="min-h-screen w-full flex flex-col px-12 py-8 bg-white">
      <div className="w-full flex items-start mb-4 gap-3">
        <Link href={"https://outlook.office365.com/mail/"}>
          <Image alt="outlook" className="h-8 w-8" src={outlook} />
        </Link>
        <h1 className="text-2xl font-bold mb-8">EazySend</h1>
      </div>
      {/* main wrapper changes in height based on content */}
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="bg-white w-full p-6 rounded-lg shadow-sm border">
          <EmailForm onSubmit={handleSubmit} />
        </div>

        {/* Animate height changes */}
        <div className="overflow-hidden">
          {emailData && <EmailPreview emailData={emailData} />}
        </div>
      </div>
    </main>
  );
}
