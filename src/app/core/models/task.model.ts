export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
  createdAt: string;
}


export type CreateTaskPayload = Omit<Task, 'id' | 'completed' | 'createdAt' | 'userId'>;
