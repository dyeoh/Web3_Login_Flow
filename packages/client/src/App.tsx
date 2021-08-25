import "./App.css";

import React, { useState } from "react";
import Web3 from "web3";

import logo from "./logo.svg";

const App = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>();

  const login = async () => {
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    let provider;

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        provider = new Web3((window as any).ethereum);
        setWeb3(provider);
        const coinbase = await provider.eth.getCoinbase();
        if (!coinbase) {
          window.alert("Please activate MetaMask first.");
          return;
        }

        const publicAddress = coinbase.toLowerCase();

        console.log(publicAddress);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p
          className="App-link"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={login}
        >
          Login
        </p>
      </header>
    </div>
  );
};

export default App;
