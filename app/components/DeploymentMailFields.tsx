"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeploymentMailFieldsProps } from "../models/IEmail";
import { formatFeatures } from "./formatFeatures";
import { TitleBuilder } from "./TitleBuilder";
import { Sparkles } from "@/components/icons";
import { useCompletion } from "@ai-sdk/react";
import { toast } from "sonner";

// Deployment Mail Form Fields
export const DeploymentMailFields = ({
  title,
  projectName,
  environment,
  features,
  onTitleChange,
  onProjectNameChange,
  onEnvironmentChange,
  onFeaturesChange,
}: DeploymentMailFieldsProps) => {
  const [isRefining, setIsRefining] = useState(false);

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/refine-features",
    onFinish: (_prompt: string, completion: string) => {
      const refinedText = formatFeatures(completion);
      onFeaturesChange(refinedText);
      setIsRefining(false);
      toast.success("Features refined successfully!");
    },
    onError: (error: Error) => {
      setIsRefining(false);
      toast.error("Failed to refine features. Please try again.");
      console.error("Error refining features:", error);
    },
  });

  const handleRefineFeatures = async () => {
    if (!features || features.trim() === "") {
      toast.error("Please enter features to refine");
      return;
    }

    setIsRefining(true);
    try {
      await complete(features);
    } catch (error) {
      setIsRefining(false);
      toast.error("Failed to refine features. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFeaturesChange((features ? features + "\n" : "") + "• ");
    }
  };

  // Use refined completion while it's being generated
  const displayText =
    isRefining && completion ? formatFeatures(completion) : features || "";

  return (
    <>
      <div className="space-y-4">
        <TitleBuilder
          title={title || ""}
          projectName={projectName}
          environment={environment}
          onTitleChange={onTitleChange}
          onProjectNameChange={onProjectNameChange}
          onEnvironmentChange={onEnvironmentChange}
        />
      </div>

      <div className="space-y-2 relative">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Features Updated</Label>
          {features && features.trim() !== "" && (
            <Button
              variant={"outline"}
              type="button"
              onClick={handleRefineFeatures}
              disabled={isLoading || isRefining}
              className="text-sm h-8 px-3 gap-2"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isLoading || isRefining ? "Refining..." : "Refine with AI"}
            </Button>
          )}
        </div>
        <Textarea
          value={displayText}
          onChange={(e) => {
            if (!isRefining) {
              onFeaturesChange(formatFeatures(e.target.value));
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="List the updated features (one per line)"
          required
          rows={4}
          disabled={isRefining}
        />

        {/* Clear Button (Only Show When There's Text and Not Refining) */}
        {features && features.trim() !== "" && !isRefining && (
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => onFeaturesChange("")}
            className="text-sm absolute -top-3 right-2 text-red-500 hover:text-red-700 transition"
          >
            Clear
          </Button>
        )}
      </div>
    </>
  );
};
