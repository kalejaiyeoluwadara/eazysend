import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Reminder Form Fields
export const ReminderFields = ({ deploymentName, onChange }: {
  deploymentName?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Deployment Name</Label>
      <Input
        value={deploymentName || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., TMS admin website TEST"
        required
      />
    </div>
  );
};
