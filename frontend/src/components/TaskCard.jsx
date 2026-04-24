function TaskCard({ task, onStatusChange, onDelete }) {
  // These are the possible statuses a task can move to
  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h3 className="font-semibold text-white mb-1">{task.title}</h3>

      {task.description && (
        <p className="text-gray-400 text-sm mb-3">{task.description}</p>
      )}

      {/* Status change buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {statuses
          .filter((s) => s !== task.status) // Don't show button for current status
          .map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(task, s)}
              className="text-xs px-2.5 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors cursor-pointer"
            >
              → {s}
            </button>
          ))}
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task)}
        className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
