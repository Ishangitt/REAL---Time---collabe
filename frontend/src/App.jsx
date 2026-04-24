import { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import TaskBoard from "./components/TaskBoard";

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  // Once the user joins a room, we show the TaskBoard
  const handleJoinRoom = (id) => {
    setRoomId(id);
    setJoined(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!joined ? (
        <JoinRoom onJoin={handleJoinRoom} />
      ) : (
        <TaskBoard roomId={roomId} />
      )}
    </div>
  );
}

export default App;
