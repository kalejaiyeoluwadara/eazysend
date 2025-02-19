"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
}

export interface EmailFormData {
  type: "mail" | "reminder";
  title?: string;
  features?: string;
  deploymentName?: string;
}

export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [formData, setFormData] = useState<EmailFormData>({
    type: "mail",
    title: "Request to deploy ",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form layout onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Email Type</Label>
        <RadioGroup
          defaultValue={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value as "mail" | "reminder" })
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mail" id="mail" />
            <Label htmlFor="mail">Deployment Mail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reminder" id="reminder" />
            <Label htmlFor="reminder">Reminder</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Animate height changes when switching form fields */}
      <motion.div
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="space-y-4"
      >
        {formData.type === "mail" ? (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Deployment Title</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Request to deploy TMS admin to TEST"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Features Updated</Label>
              <Textarea
                value={formData.features || ""}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder="List the updated features (one per line)"
                required
                rows={4}
              />
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Deployment Name</Label>
            <Input
              value={formData.deploymentName || ""}
              onChange={(e) =>
                setFormData({ ...formData, deploymentName: e.target.value })
              }
              placeholder="e.g., TMS admin website TEST"
              required
            />
          </div>
        )}
      </motion.div>

      <Button type="submit" className="w-full">
        Generate Email
      </Button>
    </motion.form>
  );
};
