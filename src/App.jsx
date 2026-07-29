import { useTasks } from "./hooks/useTasks";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

export default function App() {
  const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks();

  if (loading) return <p className="status-message">Загрузка...</p>;
  if (error) return <p className="status-message error">Ошибка: {error}</p>;

  return (
    <div className="app">
      <Header />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
    </div>
  );
}
