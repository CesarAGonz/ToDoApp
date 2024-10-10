import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TaskCard from './TaskCard';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Task } from '../types';

interface DecodedToken {
  userId: string;
  exp: number;
}

interface TaskListProps {
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onToggleComplete, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
        setAuthToken(token);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log("No token found in cookies");
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://to-do-app-ml.vercel.app/api/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        const allTasks = await response.json();
        
        const userTasks = allTasks.filter((task: Task) => task.userId === userId);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (userId && authToken) {
      console.log("Fetching tasks for user:", userId);
      fetchTasks();
    } else {
      console.log("UserId or AuthToken missing");
    }
  }, [userId, authToken]);

  const sortTasks = (a: Task, b: Task): number => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.completed && !b.completed) {
      const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
      
      const priorityA = typeof a.priority === 'number' ? a.priority : priorityOrder[a.priority];
      const priorityB = typeof b.priority === 'number' ? b.priority : priorityOrder[b.priority];

      return priorityA - priorityB;
    }

    return 0;
  };

  const sortedTasks = [...tasks].sort(sortTasks);

  if (sortedTasks.length === 0) {
    return <p className="text-secondary dark:text-secondary-light">{t('app.noTasks')}</p>;
  }

  return (
    <div className="space-y-4 overflow-y-auto h-full">
      {sortedTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
