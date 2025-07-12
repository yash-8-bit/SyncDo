import { Server } from "socket.io";

const Sockethandler = (server) => {
  console.info("run");
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN_URL,
    },
  });
  io.on("connection", (socket) => {
    console.info("connected", socket.id);
  });
};

export default Sockethandler;
