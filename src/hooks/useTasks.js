import { useState, useEffect, useCallback } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasksApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = async (id, currentCompleted) => {
    const updated = await updateTask(id, { completed: !currentCompleted });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, addTask, toggleTask, removeTask, loadTasks };
}
