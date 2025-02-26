import { Label } from "@/components/ui/label";
import { EmailTypeSelectorProps } from "../models/IEmail";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Email Type Selector Component
export const EmailTypeSelector = ({ type, onChange, }: EmailTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Email Type</Label>
      <RadioGroup
        defaultValue={type}
        onValueChange={(value) => onChange(value as "mail" | "reminder")}
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
  );
};
