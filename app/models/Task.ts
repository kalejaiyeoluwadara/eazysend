export interface TaskListData {
  date: string;
  teamMember: string;
  tasks: string;
  id?: string;
}

export interface TaskFormProps {
  onSubmit: (data: TaskListData) => void;
}
export interface TaskListData {
  date: string;
  teamMember: string;
  tasks: string;
  id?: string;
}
export interface TaskListPreviewProps {
  taskData: TaskListData;
}
// Interface for stored deployment information
export interface StoredDeploymentInfo {
  type: string;
  deploymentName: string;
  title: string;
  features: string;
}
