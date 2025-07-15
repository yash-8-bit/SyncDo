export interface taskType {
  _id?: string;
  title: string;
  description: string;
  assignedUser?: string;
  status: string;
  priority: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface taskCardType {
  task: taskType;
  assignfunc: (_id: string) => void;
  updatefunc: (_id: string) => void;
  deletefunc: (_id: string) => void;
}
