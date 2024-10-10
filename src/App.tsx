import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task, User, TaskTemp } from "./types";
import { LogOut, Moon, Sun, Languages } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [sortedData, setSortedData] = useState<Task[]>([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setUser({ username: "Authenticated User", password: "" });
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("Auth token is missing");
        return;
      }
      const decodedToken: { userId: string } = jwtDecode(authToken);
      console.log("Decoded token:", decodedToken);
      try {
        const response = await fetch(
          "https://to-do-app-ml.vercel.app/api/tasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch tasks", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Fetched tasks:", data);
        data.forEach((task: TaskTemp) => {
          if (task.priority === 1) {
            task.priority = "low";
          } else if (task.priority === 2) {
            task.priority = "medium";
          } else if (task.priority === 3) {
            task.priority = "high";
          }
        });
        const { userId } = decodedToken;
        const filteredData = data
          .filter((task2: Task) => task2.userId === userId)
          .map((task: TaskTemp) => ({
            ...task,
            completed: Boolean(task.status),
          }));
        const sortedData = filteredData.sort((a: Task, b: Task) => {
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;

          const priorityOrder: { [key: string]: number } = {
            low: 1,
            medium: 2,
            high: 3,
          };

          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        setSortedData(sortedData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [flag, user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  const handleLogin = (loginUser: User) => {
    setUser(loginUser);
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    setUser(null);
    setSortedData([]);
  };

  const addTask = (newTask: Omit<Task, "id" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    if (!flag) {
      setFlag(true);
    } else {
      setFlag(false);
    }

    setSortedData([...sortedData, task]);
  };

  const toggleTaskComplete = async (id: string) => {
    const copySortedData = [...sortedData]
    const taskIndex = sortedData.findIndex((task) => task.id === id);
    const editedTask = copySortedData[taskIndex]
    copySortedData[taskIndex] = {...editedTask, completed: !editedTask.completed}
   
    setSortedData(
      copySortedData
    );
    const authToken: string | undefined = Cookies.get("authToken");
    if (!authToken) {
      console.error("Auth token is missing");
      return;
    }

    try {
      const response = await fetch(
        `https://to-do-app-ml.vercel.app/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: !editedTask.completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating task");
      }
      await response.json();
      if (!flag) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const editTask = async (id: string, updatedTask: Partial<Task>) => {
    const priorityMap = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const taskToUpdate = {
      ...updatedTask,
      priority:
        typeof updatedTask.priority === "string"
          ? priorityMap[updatedTask.priority]
          : updatedTask.priority,
    };

    setSortedData(
      sortedData.map((task) =>
        task.id === id
          ? {
              ...task,
              ...taskToUpdate,
              priority:
                taskToUpdate.priority === 1
                  ? "low"
                  : taskToUpdate.priority === 2
                  ? "medium"
                  : "high",
            }
          : task
      )
    );
    const authToken: string | undefined = Cookies.get("authToken");
    if (!authToken) {
      console.error("Auth token is missing");
      return;
    }
    try {
      const response = await fetch(
        `https://to-do-app-ml.vercel.app/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(taskToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating task");
      }
      await response.json();
      if (!flag) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    setSortedData(sortedData.filter((task) => task.id !== id));
    const authToken: string | undefined = Cookies.get("authToken");
    if (!authToken) {
      console.error("Auth token is missing");
      return;
    }
    try {
      const response = await fetch(
        `https://to-do-app-ml.vercel.app/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error updating task");
      }
      await response.json();
      if (!flag) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 flex flex-col">
        <header className="bg-primary dark:bg-primary-dark shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{t("app.title")}</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-primary-light dark:hover:text-secondary-light"
                aria-label={t("darkMode.toggle")}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-primary-light dark:hover:text-secondary-light"
                aria-label={t("language.toggle")}
              >
                <Languages size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-secondary-dark dark:hover:bg-secondary"
              >
                <LogOut size={16} className="mr-2" />
                {t("app.logout")}
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow flex justify-center items-start p-4 overflow-hidden">
          <div className="max-w-7xl w-full h-full mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div
              className="w-full md:w-2/5 bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 overflow-y-auto border-2 border-primary dark:border-primary-dark flex flex-col"
              style={{ minHeight: "calc(100vh - 8rem)" }}
            >
              <h2 className="text-xl font-semibold mb-4 text-primary-dark dark:text-primary-light">
                {t("app.addTask")}
              </h2>
              <div className="flex-grow">
                <TaskForm onAddTask={addTask} />
              </div>
            </div>
            <div
              className="w-full md:w-3/5 bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 overflow-y-auto border-2 border-primary dark:border-primary-dark"
              style={{ height: "calc(100vh - 8rem)" }}
            >
              <h2 className="text-xl font-semibold mb-4 text-primary-dark dark:text-primary-light">
                {t("app.tasks")}
              </h2>
              <TaskList
                tasks={sortedData}
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
