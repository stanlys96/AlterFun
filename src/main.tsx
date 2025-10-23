import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { WalletConnectionProvider } from "./WalletConnectionProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletConnectionProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletConnectionProvider>
  </StrictMode>
);
