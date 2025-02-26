"use client";

import { useState } from "react";
import { EmailPreviewProps } from "../models/IEmail";
import { toast } from "sonner";
import CopyButton from "./CopyButton";

export const EmailPreview = ({ emailData }: EmailPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const generateEmailContent = () => {
    if (emailData.type === "mail") {
      return `${emailData.title}

Hi Team,
I hope this message finds you well. We are excited to inform you that a set of new fixes are ready for deployment. Please find below the list of fixes:

${emailData.features}

Please begin the deployment process to the specified environments as soon as possible. The testing team has been copied on this email and will initiate testing once the deployment is completed.
Thank you for your swift action, and let's ensure a smooth deployment.
`;
    } else {
      return ` Hi Team,

 This is a gentle reminder to deploy ${emailData.deploymentName}. Thank you for your swift response.`;
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
    <div className="relative  bg-gray-100 p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Email Preview</h2>
        <CopyButton copied={copied} handleCopy={handleCopy} />
      </div>
      <pre className="whitespace-pre-wrap text-sm text-gray-700 border p-3 rounded-md bg-white">
        {generateEmailContent()}
      </pre>
    </div>
  );
};
