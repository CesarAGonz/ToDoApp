import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task, User } from './types';
import { LogOut, Moon, Sun, Languages } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const handleLogin = (loginUser: User) => {
    setUser(loginUser);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 flex flex-col">
        <header className="bg-primary dark:bg-primary-dark shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{t('app.title')}</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-primary-light dark:hover:text-secondary-light"
                aria-label={t('darkMode.toggle')}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-primary-light dark:hover:text-secondary-light"
                aria-label={t('language.toggle')}
              >
                <Languages size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-secondary-dark dark:hover:bg-secondary"
              >
                <LogOut size={16} className="mr-2" />
                {t('app.logout')}
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow flex justify-center items-start p-4 overflow-hidden">
          <div className="max-w-7xl w-full h-full mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-2/5 bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 overflow-y-auto border-2 border-primary dark:border-primary-dark flex flex-col" style={{ minHeight: 'calc(100vh - 8rem)' }}>
              <h2 className="text-xl font-semibold mb-4 text-primary-dark dark:text-primary-light">{t('app.addTask')}</h2>
              <div className="flex-grow">
                <TaskForm onAddTask={addTask} />
              </div>
            </div>
            <div className="w-full md:w-3/5 bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 overflow-y-auto border-2 border-primary dark:border-primary-dark" style={{ height: 'calc(100vh - 8rem)' }}>
              <h2 className="text-xl font-semibold mb-4 text-primary-dark dark:text-primary-light">{t('app.tasks')}</h2>
              <TaskList
                tasks={tasks}
                onToggleComplete={toggleTaskComplete}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;