import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./utils/socket.ts";

// entry point of website
createRoot(document.getElementById("root")!).render(<App />);
