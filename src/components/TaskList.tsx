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


  if (tasks.length === 0) {
    return <p className="text-secondary dark:text-secondary-light">{t('app.noTasks')}</p>;
  }

  return (
    <div className="space-y-4 overflow-y-auto h-full">
      {tasks.map((task: Task) => (
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