export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId?: string;
}

export interface TaskTemp {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | number;
  completed: boolean;
  status: boolean;
}

export interface User {
  username: string;
  password: string;
}