// src/connectWallet.js
import { useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "4a77da30-24b1-4e05-bd35-8eba95e006e8=6d87320b88572bad3594d33fbd00590b4b4e5c3e4ccc2417a3a3083ec2fe6df4" // required
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

const useWalletConnect = () => {
  const [provider, setProvider] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [account, setAccount] = useState(null);

  const connect = async () => {
    const instance = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(instance);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    setProvider(instance);
    setWeb3Provider(web3Provider);
    setAccount(address);
  };

  const disconnect = async () => {
    if (provider && provider.disconnect) {
      await provider.disconnect();
    }
    web3Modal.clearCachedProvider();
    setProvider(null);
    setWeb3Provider(null);
    setAccount(null);
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  return {
    connect,
    disconnect,
    account
  };
};

export default useWalletConnect;
