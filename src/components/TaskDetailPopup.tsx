import React from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from '../types';
import { X } from 'lucide-react';

interface TaskDetailPopupProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailPopup: React.FC<TaskDetailPopupProps> = ({ task, onClose }) => {
  const { t } = useTranslation();

  const priorityColor = {
    low: 'bg-success text-white',
    medium: 'bg-primary-light text-white',
    high: 'bg-danger text-white',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary-dark rounded-lg p-6 w-full max-w-md max-h-[90vh] flex flex-col relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={t('taskDetailPopup.close')}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-primary-light text-center break-words">
          {task.title}
        </h2>
        <div className="mb-6 flex justify-center items-center space-x-8">
          <span className={`text-sm font-semibold px-2 py-1 rounded ${priorityColor[task.priority]}`}>
            {t(`taskForm.${task.priority}`)}
          </span>
          <span className="text-secondary dark:text-secondary-light">
            {task.completed ? t('taskDetailPopup.completed') : t('taskDetailPopup.pending')}
          </span>
        </div>
        <div className="flex-grow overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2 text-primary-dark dark:text-primary-light">
            {t('taskDetailPopup.description')}
          </h3>
          <p className="text-secondary dark:text-white whitespace-pre-wrap break-words text-sm">
            {task.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPopup;