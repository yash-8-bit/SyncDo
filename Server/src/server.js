import app from "./app.js";
import connectDB from "./config/db.config.js";
import { createServer } from "http";
import { socketHandler, getio } from "./socketHandler.js";
const server = createServer(app);
const port = process.env.PORT || 9999;

connectDB();
socketHandler(server);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
