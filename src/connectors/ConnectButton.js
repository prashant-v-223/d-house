// src/ConnectButton.js
import React from 'react';
import useWalletConnect from './connectToTrustWallet';

const ConnectButton = () => {
  const { connect, disconnect, account } = useWalletConnect();

  return (
    <div>
      {account ? (
        <div>
          <p>Connected as: {account}</p>
          <button onClick={disconnect}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectButton;
