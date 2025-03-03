"use client";

import { useState, useEffect } from "react";
import { EmailPreviewProps } from "../models/IEmail";
import { toast } from "sonner";
import CopyButton from "./CopyButton";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailCopyComponent from "./EmailCopyComponent ";

// LocalStorage key for deployment info
const DEPLOYMENT_INFO_KEY = "lastDeploymentInfo";

// Interface for stored deployment information
interface StoredDeploymentInfo {
  type: string;
  deploymentName: string;
  title: string;
  features: string;
}

export const EmailPreview = ({ emailData, setEmailData }: EmailPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [isReminderMode, setIsReminderMode] = useState(false);
  const [lastDeploymentInfo, setLastDeploymentInfo] = useState<StoredDeploymentInfo | null>(null);

  // Load last deployment info on component mount
  useEffect(() => {
    const loadLastDeploymentInfo = () => {
      try {
        const savedInfo = localStorage.getItem(DEPLOYMENT_INFO_KEY);
        if (savedInfo) {
          const parsedInfo = JSON.parse(savedInfo);
          setLastDeploymentInfo(parsedInfo);
          setEmailData(parsedInfo)
          console.log(parsedInfo)
        }
      } catch (error) {
        console.error("Error loading deployment info from localStorage:", error);
      }
    };

    loadLastDeploymentInfo();
  }, []);

  // Save deployment info to localStorage when a new deployment email is created
  useEffect(() => {
    if (isDeploymentEmail && emailData.title) {
      // Extract deployment name from title if not explicitly provided
      const deploymentName = emailData.deploymentName ||
        (emailData.title.includes("Request to deploy") ?
          emailData.title.split("Request to deploy")[1]?.trim() :
          emailData.title);

      try {
        const deploymentInfo: StoredDeploymentInfo = {
          type: 'mail',
          deploymentName: deploymentName,
          title: emailData.title,
          features: emailData.features || "",
        };

        localStorage.setItem(DEPLOYMENT_INFO_KEY, JSON.stringify(deploymentInfo));
        setLastDeploymentInfo(deploymentInfo);
      } catch (error) {
        console.error("Error saving deployment info to localStorage:", error);
      }
    }
  }, []);

  const generateEmailContent = () => {
    if (isReminderMode) {
      const deploymentName = emailData.deploymentName ||
        lastDeploymentInfo?.deploymentName ||
        "the pending changes";

      return `Hi Team,

This is a gentle reminder to deploy ${deploymentName}. Thank you for your swift response.`;
    } else if (emailData.type === "mail") {
      return `${emailData.title}

Hi Team,
I hope this message finds you well. We are excited to inform you that a set of new fixes are ready for deployment. Please find below the list of fixes:

${emailData.features}

Please begin the deployment process to the specified environments as soon as possible. The testing team has been copied on this email and will initiate testing once the deployment is completed.
Thank you for your swift action, and let's ensure a smooth deployment.
`;
    } else {
      return `Hi Team,

This is a gentle reminder to deploy the pending changes. Thank you for your swift response.`;
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

  const toggleReminderMode = () => {
    setIsReminderMode(!isReminderMode);
    if (!isReminderMode) {
      toast.info("Switched to reminder message");
    } else {
      toast.info("Switched to original message");
    }
  };

  // Check if this is a deployment email
  const isDeploymentEmail = emailData.type === "mail" &&
    (emailData.title?.toLowerCase().includes("deploy") ||
      emailData.features?.toLowerCase().includes("deploy"));

  // Show reminder button if we have a current deployment email OR saved deployment info
  const showReminderButton = isDeploymentEmail || !!lastDeploymentInfo;

  return (
    <main className="flex flex-col gap-2">
      <EmailCopyComponent />
      <div className="relative group bg-gray-100 p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Email Preview</h2>
          <div className="flex gap-2">
            <CopyButton copied={copied} handleCopy={handleCopy} />
          </div>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 border p-3 rounded-md bg-white">
          {generateEmailContent()}
        </pre>

        <div className="absolute transition-all right-3 -bottom-4 ">
          {showReminderButton && (
            <Button
              variant={isReminderMode ? "default" : "outline"}
              size="sm"
              onClick={toggleReminderMode}
              className="flex group-hover:visible invisible rounded-full items-center gap-1"
            >
              <Bell className="h-4 w-4" />
              {isReminderMode ? "Original" : "Generate Reminder"}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};