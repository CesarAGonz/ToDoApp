export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId?: string;
}

export interface User {
  username: string;
  password: string;
}