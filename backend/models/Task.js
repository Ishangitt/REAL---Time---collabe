const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], 
      trim: true,
    },
    description: {
      type: String,
      default: "", 
      trim: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"], 
      default: "To Do",
    },
    roomId: {
      type: String,
      required: [true, "Room ID is needed for the board"],
    },
  },
  {
    timestamps: true, // Gives us createdAt and updatedAt automatically
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
