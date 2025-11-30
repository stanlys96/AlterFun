import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { WalletConnectionProvider } from "./WalletConnectionProvider";
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter()],
});

createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId: "85bb78d3e28a1aa94144cacb71c3e242",
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: {
    name: "My Trading App",
    description: "Trade tokens on Solana",
    url: "https://myapp.com",
    icons: ["https://myapp.com/icon.png"],
  },
  features: {
    analytics: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletConnectionProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletConnectionProvider>
  </StrictMode>
);
