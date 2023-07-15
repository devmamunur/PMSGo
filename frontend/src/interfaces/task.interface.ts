export interface Task {
  _id: string;
  title: string;
  description: string;
  createdDate: string;
  status: string;
}

export interface TaskCardProps {
  task: Task;
  UpdateItem: (id: string, status: string) => void;
  DeleteItem: (id: string) => void;
}
