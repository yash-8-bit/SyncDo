export interface taskType {
  _id?: string;
  title: string;
  description: string;
  assignedUser?: string;
  status: string;
  priority: string;
}

export interface taskStatustype {
  "ToDo": taskType[];
  "In Progress": taskType[];
  "Done": taskType[];
}
