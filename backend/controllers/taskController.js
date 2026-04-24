const Task = require("../models/Task");

const getTasks = async (request, response) => {
  try {
    const roomId = request.params.roomId;
    
    // Sort so newest tasks show up first
    const tasks = await Task.find({ roomId }).sort({ createdAt: -1 });
    
    response.status(200).json(tasks);
  } catch (error) {
    console.log("getTasks error:", error.message);
    response.status(500).json({ error: "Could not fetch tasks" });
  }
};

const addTask = async (request, response) => {
  try {
    const { title, description, status, roomId } = request.body;

    if (!title || !roomId) {
      return response.status(400).json({ error: "Title and Room ID are required!" });
    }

    const taskObj = new Task({
      title,
      description: description || "",
      status: status || "To Do",
      roomId,
    });

    const savedTask = await taskObj.save();
    console.log("New task created:", savedTask.title); // keeping this for debugging
    
    response.status(201).json(savedTask);
  } catch (error) {
    console.log("addTask error:", error.message);
    response.status(500).json({ error: "Failed to create task" });
  }
};

const editTask = async (request, response) => {
  try {
    const taskId = request.params.id;
    const { title, description, status } = request.body;

    // { new: true } returns the updated data. I missed this initially and it was sending old data!
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return response.status(404).json({ error: "Task not found" });
    }

    response.status(200).json(updatedTask);
  } catch (error) {
    console.log("editTask error:", error.message);
    response.status(500).json({ error: "Failed to update task" });
  }
};

const removeTask = async (request, response) => {
  try {
    const taskId = request.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return response.status(404).json({ error: "Task not found" });
    }

    response.status(200).json({ message: "Task removed", id: taskId });
  } catch (error) {
    console.log("removeTask error:", error.message);
    response.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  addTask,
  editTask,
  removeTask,
};
