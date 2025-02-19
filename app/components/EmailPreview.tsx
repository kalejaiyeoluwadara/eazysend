"use client";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface EmailPreviewProps {
  emailData: {
    type: "mail" | "reminder";
    title?: string;
    features?: string;
    deploymentName?: string;
  };
}

export const EmailPreview = ({ emailData }: EmailPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const generateEmailContent = () => {
    if (emailData.type === "mail") {
      return `Subject: ${emailData.title}\n\nFeatures Updated:\n${emailData.features}`;
    } else {
      return `Reminder for deployment: ${emailData.deploymentName}`;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateEmailContent());
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="relative my-6 bg-gray-100 p-4 rounded-lg border">
      <Toaster />
      <h2 className="text-lg font-semibold mb-2">Email Preview</h2>
      <pre className="whitespace-pre-wrap text-sm text-gray-700 border p-3 rounded-md">
        {generateEmailContent()}
      </pre>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
      >
        <FiCopy className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
