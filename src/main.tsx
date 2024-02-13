import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ToastProvider } from "./hooks/toast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ToastProvider>
  </React.StrictMode>
);
