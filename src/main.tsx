import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: "my-toast",
          title: "my-toast-title",
          description: "my-toast-description",
          icon: "my-toast-icon",

          success: "my-toast-success",
          error: "my-toast-error",
          info: "my-toast-info",
          warning: "my-toast-warning",
        },
      }}
    />
  </Provider>,
);
