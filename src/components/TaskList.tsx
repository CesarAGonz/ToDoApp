import React from 'react';
import { useTranslation } from 'react-i18next';
import TaskCard from './TaskCard';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const sortTasks = (a: Task, b: Task): number => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    if (!a.completed && !b.completed) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
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