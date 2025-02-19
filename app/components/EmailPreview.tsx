import { EmailFormData } from "./EmailsForm";

interface EmailPreviewProps {
  emailData: EmailFormData;
}

export const EmailPreview = ({ emailData }: EmailPreviewProps) => {
  const getEmailContent = () => {
    if (emailData.type === "mail") {
      return `${emailData.title}

Hi Team,

I hope this message finds you well. We are excited to inform you that a set of new fixes are ready for deployment. Please find below the list of fixes:

${emailData.features}

Please begin the deployment process to the specified environments as soon as possible. The testing team has been copied on this email and will initiate testing once the deployment is completed.

Thank you for your swift action, and let's ensure a smooth deployment.`;
    } else {
      return `Dear Team,

This is a gentle reminder to deploy ${emailData.deploymentName}. Thank you for your swift response.`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-medium mb-4">Preview</h3>
      <pre className="whitespace-pre-wrap font-sans text-sm">
        {getEmailContent()}
      </pre>
    </div>
  );
};
