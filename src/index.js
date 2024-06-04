import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

const chainId = ChainId.BinanceSmartChainTestnet;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
   <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={97}
      clientId="05b562387d7b3a4ad7ab03cd69484bdf"
    >
     <App />
    </ThirdwebProvider>
  </Router>
);



reportWebVitals();
