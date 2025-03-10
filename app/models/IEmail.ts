import { Dispatch, SetStateAction } from "react";

export interface EmailFormData {
  type: "mail" | "reminder";
  title?: string;
  features?: string;
  deploymentName?: string;
}

export interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
}
export interface EmailTypeSelectorProps {
  type: "mail" | "reminder";
  onChange: (value: "mail" | "reminder") => void;
}
export interface DeploymentMailFieldsProps {
  title?: string;
  features?: string;
  onTitleChange: (value: string) => void;
  onFeaturesChange: (value: string) => void;
}
export interface EmailPreviewProps {
  setEmailData: Dispatch<SetStateAction<EmailFormData | null>>;
  emailData: {
    type: "mail" | "reminder" | "tasks";
    title?: string;
    features?: string;
    deploymentName?: string;
  };
}
