# Real-Time Collaborative Task Board

A real-time task management system where multiple users can collaborate on the same board. Users can create tasks, update their status (To Do, In Progress, Done), and delete them. All changes are synced instantly across all connected users using WebSockets.

---

## 🚀 How to Run the Project

### 1. Prerequisites
Make sure you have **Node.js** and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/23831a72b0-beep/real-time-collaborative-task-board.git
cd real-time-collaborative-task-board
```

### 3. Backend Setup
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one is already provided as a template):
   - Update `MONGODB_URI` with your actual MongoDB Atlas connection string.
   - You can also change the `PORT` (default is 5000).
4. Start the backend:
   ```bash
   npm run dev
   ```

### 4. Frontend Setup
1. Open a new terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173/`.

---

## ✨ Features
- **Real-Time Sync**: Any change made by one user (adding, moving, or deleting a task) is instantly reflected on everyone else's screen.
- **Room-Based Collaboration**: Users can join specific rooms (e.g., "team-project") to work together on a specific board.
- **Drag & Click Status Updates**: Simple buttons on each task card to move tasks between "To Do", "In Progress", and "Done".
- **Responsive Design**: The board works smoothly on both desktop and mobile devices.
- **Persistent Storage**: All tasks are saved in MongoDB, so they aren't lost when you refresh the page.

---

## 🛠️ Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Real-Time**: Socket.io
- **Database**: MongoDB (Mongoose)
- **Environment**: dotenv (for security)

---

## 🧠 Challenges I Faced & How I Solved Them
*Written from my perspective as a student at GNIT.*

1. **Setting up Socket.io with Express**: 
   Initially, I tried to just use `app.listen` with Socket.io, but it didn't work. I learned from my CCBP notes that Socket.io needs a raw HTTP server instance. I fixed this by using the `http` module to create a server and then passing that to Socket.io.
   
2. **Real-Time BroadCasting**: 
   At first, I was sending updates to everyone, even people in different rooms! I realized I needed to use `socket.join(roomId)` and then use `io.to(roomId).emit()` so that only the people working on the same project see the updates.

3. **Handling State in React**: 
   Keeping the frontend UI in sync with the backend and the socket events was tricky. I solved this by using `useEffect` to set up listeners when the component loads and making sure to use `socket.off()` to clean up listeners so they don't trigger multiple times.

---

## 📚 What I Learned
- I understood the difference between **REST APIs** (good for initial loading) and **WebSockets** (good for live updates).
- I got hands-on experience with **Mongoose schemas** and how to handle database connections securely using `.env`.
- I learned how to structure a project with a separate backend and frontend, which is how real production apps are built.
- Using **Tailwind CSS** helped me build a modern UI much faster than writing raw CSS.

---

## 👨‍💻 Author
**Ishan Jain**
3rd-year B.Tech CSE Student
Lakshmi Narain College of Technology(Bhopal)
