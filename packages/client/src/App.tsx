import "./App.css";

import React, { useState } from "react";
import Web3 from "web3";

import logo from "./logo.svg";
import APIClient from "./utils/client";

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

        const res = await APIClient.get("/users", {
          params: { publicAddress },
        });

        // GET NONCE
        if (res?.data.length > 0) {
          const nonce = res.data[0].nonce;
          const signature = await provider.eth.personal.sign(
            nonce.toString(),
            publicAddress,
            ""
          );
          //TODO: sign the nonce and send back to the backend
          console.log(signature);

          const verificationRes = await APIClient.post("/users/verify", {
            publicAddress,
            signature,
          });

          window.alert(verificationRes?.data);
        } else {
          window.alert("Error fetching nonce value");
        }
      } catch (error) {
        window.alert(error);
        return;
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Web3 Login Flow</p>
        <p
          className="App-link"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={login}
        >
          Metamask Login
        </p>
      </header>
    </div>
  );
};

export default App;
