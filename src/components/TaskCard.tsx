import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from '../types';
import { Pencil, Trash2, Check } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import TaskDetailPopup from './TaskDetailPopup';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const { t } = useTranslation();

  const getPriorityLabel = (priority: 'low' | 'medium' | 'high' | 1 | 2 | 3) => {
    if (typeof priority === 'number') {
      switch (priority) {
        case 1:
          return 'low';
        case 2:
          return 'medium';
        case 3:
          return 'high';
        default:
          return 'low';
      }
    }
    return priority;
  };

  const handleEdit = () => {
    onEdit(task.id, { 
      title: editedTitle, 
      description: editedDescription.slice(0, 300), 
      priority: editedPriority 
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
    setIsDialogOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) {
      setIsDetailPopupOpen(true);
    }
  };

  const priorityColor = {
    low: 'bg-success text-white',
    medium: 'bg-primary-light text-white',
    high: 'bg-danger text-white',
  };

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 mb-4 ${task.completed ? 'opacity-50' : ''} transition-colors duration-300 border-l-4 ${
          getPriorityLabel(task.priority) === 'high' ? 'border-danger' :
          getPriorityLabel(task.priority) === 'medium' ? 'border-primary-light' :
          'border-success'
        } relative cursor-pointer`}
        onClick={handleCardClick}
      >
        {task.completed && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg"
            aria-label={t('taskCard.reopenTask')}
          >
            <Check size={48} className="text-success" />
          </button>
        )}
        {isEditing ? (
          <div className="space-y-2"
          onClick={(e) => e.stopPropagation()}> 
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-text-light dark:text-text-dark"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value.slice(0, 300))}
              className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-text-light dark:text-text-dark"
            ></textarea>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
              {editedDescription.length}/300 {t('taskForm.characters')}
            </p>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full p-2 border rounded bg-white dark:bg-gray-600 text-text-light dark:text-text-dark"
            >
              <option value="low">{t('taskForm.low')}</option>
              <option value="medium">{t('taskForm.medium')}</option>
              <option value="high">{t('taskForm.high')}</option>
            </select>
            <button onClick={handleEdit} className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary dark:bg-primary-dark dark:hover:bg-primary">
              {t('taskCard.save')}
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''} text-primary-dark dark:text-primary-light`}>{task.title}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColor[getPriorityLabel(task.priority)]}`}>
                {t(`taskForm.${getPriorityLabel(task.priority)}`)}
              </span>
            </div>
            <p className="text-secondary dark:text-gray-300 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{task.description}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                  className="text-primary-light hover:text-primary dark:text-primary-light dark:hover:text-primary"
                  aria-label={t('taskCard.edit')}
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                  className="text-danger hover:text-red-700"
                  aria-label={t('taskCard.delete')}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              {!task.completed && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleComplete(); }}
                  className="flex items-center text-secondary dark:text-gray-300 hover:text-success"
                >
                  <Check size={20} />
                  <span className="ml-1">{t('taskCard.markComplete')}</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleToggleComplete}
        message={t('taskCard.reopenConfirmation')}
      />
      {isDetailPopupOpen && (
        <TaskDetailPopup
          task={task}
          onClose={() => setIsDetailPopupOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
