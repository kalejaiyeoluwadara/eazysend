"use client";
import { useState } from "react";
import { EmailForm, EmailFormData } from "./components/EmailsForm";
import { EmailPreview } from "./components/EmailPreview";
export default function Home() {
  const [emailData, setEmailData] = useState<EmailFormData | null>(null);

  const handleSubmit = (data: EmailFormData) => {
    setEmailData(data);
  };

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-8">EazySend</h1>

      <div className="flex flex-col w-[80vw]">
        <div className="bg-white w-full p-6 rounded-lg shadow-sm border">
          <EmailForm onSubmit={handleSubmit} />
        </div>

        {emailData && <EmailPreview emailData={emailData} />}
      </div>
    </main>
  );
}
