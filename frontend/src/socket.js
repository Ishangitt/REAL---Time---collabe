import { io } from "socket.io-client";

// Backend URL - change this if your backend runs on a different port
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Creating a single socket connection that we reuse across the app
const socket = io(BACKEND_URL);

export default socket;
