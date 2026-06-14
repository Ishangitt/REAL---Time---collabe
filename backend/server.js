const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const Task = require("./models/Task");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Allowed frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || "https://real-time-collabe.vercel.app";

// ✅ CORS (IMPORTANT FIX)
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Socket.io setup (FIXED)
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Connect DB
connectDB();

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/tasks", taskRoutes);

// ================= SOCKET LOGIC =================

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  // CREATE TASK
  socket.on("create-task", async (data) => {
    try {
      const task = new Task({
        title: data.title,
        description: data.description || "",
        status: data.status || "To Do",
        roomId: data.roomId,
      });

      const savedTask = await task.save();

      io.to(data.roomId).emit("task-created", savedTask);
    } catch (err) {
      console.log("Create error:", err.message);
    }
  });

  // UPDATE TASK
  socket.on("update-task", async (data) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        data._id,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
        { new: true }
      );

      if (updatedTask) {
        io.to(data.roomId).emit("task-updated", updatedTask);
      }
    } catch (err) {
      console.log("Update error:", err.message);
    }
  });

  // DELETE TASK
  socket.on("delete-task", async (data) => {
    try {
      const deleted = await Task.findByIdAndDelete(data._id);

      if (deleted) {
        io.to(data.roomId).emit("task-deleted", data._id);
      }
    } catch (err) {
      console.log("Delete error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ PORT (Render compatible)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
