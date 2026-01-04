"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TitleBuilderProps {
  title: string;
  projectName?: string;
  environment?: "TEST" | "STAGING" | "LIVE";
  onTitleChange: (title: string) => void;
  onProjectNameChange: (projectName: string) => void;
  onEnvironmentChange: (environment: "TEST" | "STAGING" | "LIVE") => void;
}

export const TitleBuilder = ({
  title,
  projectName,
  environment,
  onTitleChange,
  onProjectNameChange,
  onEnvironmentChange,
}: TitleBuilderProps) => {
  const [projects, setProjects] = useState<string[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("predefinedProjects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Helper function to compute title
  const computeTitle = (
    projName?: string,
    env?: "TEST" | "STAGING" | "LIVE"
  ): string => {
    if (projName && env) {
      return `Request to Deploy ${projName} to ${env}`;
    } else if (projName) {
      return `Request to Deploy ${projName} to TEST`;
    } else if (env) {
      return `Request to Deploy to ${env}`;
    } else {
      return "Request to Deploy";
    }
  };

  const saveProjects = (updatedProjects: string[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("predefinedProjects", JSON.stringify(updatedProjects));
  };

  const updateTitleAndProject = (newProjectName: string) => {
    const newTitle = computeTitle(newProjectName, environment);
    onProjectNameChange(newProjectName);
    onTitleChange(newTitle);
  };

  const updateTitleAndEnvironment = (newEnv: "TEST" | "STAGING" | "LIVE") => {
    const newTitle = computeTitle(projectName, newEnv);
    onEnvironmentChange(newEnv);
    onTitleChange(newTitle);
  };

  const handleAddProject = (projectName: string) => {
    if (projectName.trim() && !projects.includes(projectName.trim())) {
      const updated = [...projects, projectName.trim()];
      saveProjects(updated);
      updateTitleAndProject(projectName.trim());
      setNewProjectName("");
      setIsAddingProject(false);
    }
  };

  const handleProjectSelect = (selectedProject: string) => {
    updateTitleAndProject(selectedProject);
  };

  const handleEnvironmentSelect = (
    selectedEnv: "TEST" | "STAGING" | "LIVE"
  ) => {
    updateTitleAndEnvironment(selectedEnv);
  };

  const removeProject = (proj: string) => {
    const updated = projects.filter((p) => p !== proj);
    saveProjects(updated);
    if (projectName === proj) {
      updateTitleAndProject("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Title Input with Project and Environment Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Title</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Request to Deploy
          </span>
          <div className="flex-1">
            <Combobox
              options={projects}
              value={projectName}
              onValueChange={handleProjectSelect}
              placeholder="Select or type project name..."
              allowCustom={true}
              onAddNew={handleAddProject}
            />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            to
          </span>
          <Select
            value={environment}
            onValueChange={(value) =>
              handleEnvironmentSelect(value as "TEST" | "STAGING" | "LIVE")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TEST">TEST</SelectItem>
              <SelectItem value="STAGING">STAGING</SelectItem>
              <SelectItem value="LIVE">LIVE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Management Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-muted-foreground">
            Manage Projects
          </Label>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setIsAddingProject(!isAddingProject)}
            className="h-7 px-2 text-xs"
          >
            {isAddingProject ? (
              <X className="h-3 w-3 mr-1" />
            ) : (
              <Plus className="h-3 w-3 mr-1" />
            )}
            {isAddingProject ? "Cancel" : "Add New"}
          </Button>
        </div>

        {isAddingProject ? (
          <div className="flex gap-2">
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name..."
              className="h-9"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddProject(newProjectName);
                }
              }}
            />
            <Button
              type="button"
              onClick={() => handleAddProject(newProjectName)}
              size="sm"
              className="h-9"
            >
              Add
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {projects.length > 0 ? (
              projects.map((proj) => (
                <div
                  key={proj}
                  className={`group relative flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    projectName === proj
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {proj}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(proj);
                    }}
                    className="ml-1.5 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No projects added yet. Use the combobox above to add one.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Title Preview */}
      <div className="space-y-2 text-muted-foreground italic text-xs">
        Preview:{" "}
        <span className="font-semibold text-foreground">
          {title || "Request to Deploy"}
        </span>
      </div>
    </div>
  );
};
