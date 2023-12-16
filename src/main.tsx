import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="top-center" />
  </>
);
