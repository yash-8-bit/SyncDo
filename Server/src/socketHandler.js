import { Server } from "socket.io";

let io = null;

const socketHandler = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN_URL,
    },
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
