"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { EmailFormData, EmailFormProps } from "../models/IEmail";
import { EmailTypeSelector } from "./EmailTypeSelector";
import { DeploymentMailFields } from "./DeploymentMailFields";
import { ReminderFields } from "./ReminderFields";
import { toast } from "sonner";

// Main EmailForm Component
export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [formData, setFormData] = useState<EmailFormData>({
    type: "mail",
    title: "Request to deploy ",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success("Mail generated.");
  };

  const updateFormField = <K extends keyof EmailFormData>(
    field: K,
    value: EmailFormData[K]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <motion.form layout onSubmit={handleSubmit} className="space-y-6 ">
      <EmailTypeSelector
        type={formData.type}
        onChange={(value) => updateFormField("type", value)}
      />

      {/* Animate height changes when switching form fields */}
      <motion.div
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="space-y-4"
      >
        {formData.type === "mail" ? (
          <DeploymentMailFields
            title={formData.title}
            projectName={formData.projectName}
            environment={formData.environment}
            features={formData.features}
            onTitleChange={(value) => updateFormField("title", value)}
            onProjectNameChange={(value) => {
              updateFormField("projectName", value);
              updateFormField("deploymentName", value);
            }}
            onEnvironmentChange={(value) =>
              updateFormField("environment", value)
            }
            onFeaturesChange={(value) => updateFormField("features", value)}
          />
        ) : (
          <ReminderFields
            deploymentName={formData.deploymentName}
            onChange={(value) => updateFormField("deploymentName", value)}
          />
        )}
      </motion.div>

      <Button type="submit" className="w-full">
        Generate Email
      </Button>
    </motion.form>
  );
};
