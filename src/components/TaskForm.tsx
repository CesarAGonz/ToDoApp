import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 300);
    setDescription(value);
  };

  const priorityButtonClass = (buttonPriority: 'low' | 'medium' | 'high') =>
    `px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      priority === buttonPriority
        ? `text-white ${
            buttonPriority === 'low'
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              : buttonPriority === 'medium'
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
          }`
        : 'text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-500 border border-gray-300'
    }`;

  const inputClass = "mt-1 block w-full rounded-md border-2 border-secondary-light shadow-sm focus:border-primary focus:ring-2 focus:ring-primary sm:text-sm bg-white dark:bg-gray-700 text-text-light dark:text-text-dark transition-all duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-primary-dark dark:text-primary-light">
          {t('taskForm.title')}
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-primary-dark dark:text-primary-light">
          {t('taskForm.description')}
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
          className={`${inputClass} h-32 resize-none`}
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          {description.length}/300 {t('taskForm.characters')}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-dark dark:text-primary-light mb-2">
          {t('taskForm.priority')}
        </label>
        <div className="flex justify-between space-x-2">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={priorityButtonClass('low')}
          >
            {t('taskForm.low')}
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={priorityButtonClass('medium')}
          >
            {t('taskForm.medium')}
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={priorityButtonClass('high')}
          >
            {t('taskForm.high')}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-primary-dark dark:hover:bg-primary mt-4"
      >
        {t('taskForm.add')}
      </button>
    </form>
  );
}

export default TaskForm;