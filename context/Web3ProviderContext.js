"use client";
import React, { createContext, useState, useContext } from "react";
import { ethers } from "ethers";

// Create a context
const Web3ProviderContext = createContext();

// Create a provider component
export const Web3ProviderContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("MetaMask is installed!");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts[0]);
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        // localStorage.setItem("web3Provider", JSON.stringify(prov));
        // localStorage.setItem("web3Wallet", JSON.stringify(wallet));

        setProvider(prov);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("web3Provider");
    setProvider(null);
  };

  return (
    <Web3ProviderContext.Provider value={{ provider, wallet, connectWallet }}>
      {children}
    </Web3ProviderContext.Provider>
  );
};

// Custom hook to use the Web3ProviderContext
export const useWeb3Provider = () => useContext(Web3ProviderContext);
