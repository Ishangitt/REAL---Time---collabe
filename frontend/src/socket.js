import { io } from "socket.io-client";

// Backend URL - change this if your backend runs on a different port
const BACKEND_URL = "http://localhost:5000";

// Creating a single socket connection that we reuse across the app
const socket = io(BACKEND_URL);

export default socket;
