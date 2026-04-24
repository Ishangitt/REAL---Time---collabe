import { useState, useEffect } from "react";
import socket from "../socket";
import TaskColumn from "./TaskColumn";
import AddTaskModal from "./AddTaskModal";

function TaskBoard({ roomId }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Tell the backend we are joining this room
    socket.emit("join-room", roomId);

    // Fetch existing tasks from the REST API when we first load
    fetch(`http://localhost:5000/api/tasks/${roomId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));

    // Listen for real-time events from Socket.io
    socket.on("task-created", (newTask) => {
      setTasks((prev) => [newTask, ...prev]);
    });

    socket.on("task-updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    socket.on("task-deleted", (deletedId) => {
      setTasks((prev) => prev.filter((task) => task._id !== deletedId));
    });

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("task-created");
      socket.off("task-updated");
      socket.off("task-deleted");
    };
  }, [roomId]);

  // Handle adding a new task via socket
  const handleAddTask = (title, description) => {
    socket.emit("create-task", {
      title,
      description,
      status: "To Do",
      roomId,
    });
    setShowModal(false);
  };

  // Handle changing task status (the buttons on each card)
  const handleStatusChange = (task, newStatus) => {
    socket.emit("update-task", {
      ...task,
      status: newStatus,
      roomId,
    });
  };

  // Handle deleting a task
  const handleDelete = (task) => {
    socket.emit("delete-task", { _id: task._id, roomId });
  };

  // Filter tasks by status for each column
  const todoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-gray-400 text-sm">
            Room: <span className="text-blue-400 font-medium">{roomId}</span>
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-sm cursor-pointer"
        >
          + Add Task
        </button>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="To Do"
          color="blue"
          tasks={todoTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="In Progress"
          color="yellow"
          tasks={inProgressTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="Done"
          color="green"
          tasks={doneTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal for adding task */}
      {showModal && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default TaskBoard;
