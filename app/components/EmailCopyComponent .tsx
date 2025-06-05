import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { toast } from "sonner";

const EmailCopyComponent = () => {
  const emails = [
    "temitope.okelola@xownsolutions.com",
    "pmo@xownsolutions.com",
  ];

  const [copySuccess, setCopySuccess] = useState(false);

  // Format emails for CC (comma-separated)
  const formattedEmails = emails.join(", ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedEmails);
      setCopySuccess(true);
      toast.success("Copied to clipboard!");
      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full relative bg-white rounded-lg ">
      <h2 className="text-xl font-semibold mb-1">Email CC List</h2>

      <div className="mb-1 flex gap-1 flex-wrap p-3 bg-gray-100 rounded-md ">
        {emails.map((email, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {email}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <CopyButton handleCopy={handleCopy} copied={copySuccess} />

        <span className="text-sm text-gray-500">
          {emails.length} email addresses
        </span>
      </div>
    </div>
  );
};

export default EmailCopyComponent;
