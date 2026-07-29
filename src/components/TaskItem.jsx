export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
      />
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <span className="task-description">{task.description}</span>
        )}
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Удалить
      </button>
    </div>
  );
}
