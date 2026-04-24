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

// Socket.io needs an HTTP server to bind to. Took me some time to realize app.listen isn't enough!
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors()); 
app.use(express.json()); 

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/tasks", taskRoutes);

// --- Socket.io Real-Time Logic ---

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("create-task", async (data) => {
    try {
      const taskObj = new Task({
        title: data.title,
        description: data.description || "",
        status: data.status || "To Do",
        roomId: data.roomId,
      });

      const savedTask = await taskObj.save();
      
      // Emit only to people in this room so we don't update other boards
      io.to(data.roomId).emit("task-created", savedTask);
    } catch (err) {
      console.log("Socket create task error:", err.message);
    }
  });

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
      console.log("Socket update error:", err.message);
    }
  });

  socket.on("delete-task", async (data) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(data._id);

      if (deletedTask) {
        io.to(data.roomId).emit("task-deleted", data._id);
      }
    } catch (err) {
      console.log("Socket delete error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id); 
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
