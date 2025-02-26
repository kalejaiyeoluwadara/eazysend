import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeploymentMailFieldsProps } from "../models/IEmail";
import { formatFeatures } from "./formatFeatures";

// Deployment Mail Form Fields
export const DeploymentMailFields = ({ title, features, onTitleChange, onFeaturesChange,
}: DeploymentMailFieldsProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onFeaturesChange((features ? features + "\n" : "") + "• ");
        }
    };

    return (
        <>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Deployment Title</Label>
                <Input
                    value={title || ""}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="e.g., Request to deploy TMS admin to TEST"
                    required
                />
            </div>
            <div className="space-y-2 relative">
                <Label className="text-sm font-medium">Features Updated</Label>
                <Textarea
                    value={features || ""}
                    onChange={(e) => onFeaturesChange(formatFeatures(e.target.value))}
                    onKeyDown={handleKeyDown}
                    placeholder="List the updated features (one per line)"
                    required
                    rows={4}
                />

                {/* Clear Button (Only Show When There's Text) */}
                {features && features.trim() !== "" && (
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
