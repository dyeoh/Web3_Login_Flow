import "./App.css";

import { Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Web3 from "web3";

import APIClient from "./utils/client";

const Web3Login: React.FC = () => {
  const init = async () => {
    try {
      // Request account access if needed
      await (window as any).ethereum.enable();

      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      const provider = new Web3((window as any).ethereum);

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
  };
  return <Button onClick={init}>eat my ass</Button>;
};

const App = () => {
  return (
    <ChakraProvider>
      <Web3Login />
    </ChakraProvider>
  );
};

export default App;
