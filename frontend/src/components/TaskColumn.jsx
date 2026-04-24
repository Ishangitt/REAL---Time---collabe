import TaskCard from "./TaskCard";

function TaskColumn({ title, color, tasks, onStatusChange, onDelete }) {
  // Picking colors based on the column type
  const colorStyles = {
    blue: "border-blue-500 bg-blue-500/10",
    yellow: "border-yellow-500 bg-yellow-500/10",
    green: "border-green-500 bg-green-500/10",
  };

  const dotColors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  return (
    <div
      className={`rounded-xl border ${colorStyles[color]} p-4 min-h-[300px]`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${dotColors[color]}`}></div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="text-gray-400 text-sm ml-auto">{tasks.length}</span>
      </div>

      {/* Show all task cards or a message if empty */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No tasks here yet
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
