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
  type: "mail" | "reminder" | "tasks";
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
            setFormData({
              ...formData,
              type: value as "mail" | "reminder" | "tasks",
            })
          }
          className="flex sm:flex-row flex-col gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mail" id="mail" />
            <Label htmlFor="mail">Deployment Mail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reminder" id="reminder" />
            <Label htmlFor="reminder">Reminder</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tasks" id="tasks" />
            <Label htmlFor="tasks">Tasks</Label>
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
            <div className="space-y-2 relative">
              <Label className="text-sm font-medium">Features Updated</Label>
              <Textarea
                value={formData.features || ""}
                onChange={(e) => {
                  const newValue = e.target.value
                    .split("\n")
                    .map((line) =>
                      line.startsWith("• ") ? line : `• ${line.trim()}`
                    )
                    .join("\n");
                  setFormData({ ...formData, features: newValue });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default new line
                    setFormData((prev) => ({
                      ...prev,
                      features:
                        (prev.features ? prev.features + "\n" : "") + "• ",
                    }));
                  }
                }}
                placeholder="List the updated features (one per line)"
                required
                rows={4}
              />

              {/* Clear Button (Only Show When There's Text) */}
              {formData.features && formData.features.trim() !== "" && (
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() => setFormData({ ...formData, features: "" })}
                  className="text-sm absolute -top-3 right-2 text-red-500 hover:text-red-700 transition"
                >
                  Clear
                </Button>
              )}
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
      <motion.div
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="space-y-4"
      >
        {formData.type === "tasks" ? (
          <>
            <div className="space-y-2 relative">
              <Label className="text-sm font-medium">
                Tasks Done for the day
              </Label>
              <Textarea
                value={formData.features || ""}
                onChange={(e) => {
                  const newValue = e.target.value
                    .split("\n")
                    .map((line) =>
                      line.startsWith("• ") ? line : `• ${line.trim()}`
                    )
                    .join("\n");
                  setFormData({ ...formData, features: newValue });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default new line
                    setFormData((prev) => ({
                      ...prev,
                      features:
                        (prev.features ? prev.features + "\n" : "") + "• ",
                    }));
                  }
                }}
                placeholder="List the updated features (one per line)"
                required
                rows={4}
              />

              {/* Clear Button (Only Show When There's Text) */}
              {formData.features && formData.features.trim() !== "" && (
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() => setFormData({ ...formData, features: "" })}
                  className="text-sm absolute -top-3 right-2 text-red-500 hover:text-red-700 transition"
                >
                  Clear
                </Button>
              )}
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
