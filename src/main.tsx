import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { store } from "./app/store";
import { HelmetProvider } from "react-helmet-async";

const rootEl = document.getElementById("root")!;

const tree = (
  <Provider store={store}>
    <HelmetProvider>
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
    </HelmetProvider>
  </Provider>
);

// react-snap prerenders HTML into #root at build time; hydrate if present.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
