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
