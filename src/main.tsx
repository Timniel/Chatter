import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ToastProvider } from "./hooks/toast.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ToastProvider>
        <Provider store={store}>
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </Provider>
      </ToastProvider>
    </NextUIProvider>
  </React.StrictMode>
);
