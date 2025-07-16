import { Server } from "socket.io";

let io = null;

// Initialize io for live sync
const socketHandler = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN_URL,
    },
    transports: ["websocket"],
  });
  io.on("connection", (socket) => {
    console.info("connected", socket.id);
  });
};

const getio = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export { socketHandler, getio };
