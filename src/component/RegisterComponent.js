import React, { useState } from 'react';
import { ethers } from 'ethers';

const RegisterComponent = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const contractAddress = '0x16f16FaDb27f04bdb754F073AFDec59C3046a31E';
  const abi = [
    // Your contract's ABI
    "function Register(uint256 amount) public returns (bool)"
  ];

  const handleRegister = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        setStatus('MetaMask is not installed');
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a new Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert amount to a BigNumber
      const amountInWei = ethers.utils.parseUnits(amount, 'ether');

      // Call the Register function
      const tx = await contract.Register(amountInWei);

      // Wait for the transaction to be mined
      await tx.wait();

      setStatus('Transaction successful!');
    } catch (error) {
      console.error(error);
      setStatus('Transaction failed!');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleRegister}>Register</button>
      <div>Status: {status}</div>
    </div>
  );
};

export default RegisterComponent;
