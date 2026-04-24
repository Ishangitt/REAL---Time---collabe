import { useState } from "react";

function JoinRoom({ onJoin }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only join if user entered something
    if (inputValue.trim() !== "") {
      onJoin(inputValue.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">📋 Task Board</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter a Room ID to collaborate with your team in real-time
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Room ID (e.g., team-alpha)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
