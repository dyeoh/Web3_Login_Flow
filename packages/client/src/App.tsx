import "./App.css";

import { Button, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import Web3 from "web3";

import { AppProvider, useAppContext } from "./providers/AppProvider";
import APIClient from "./utils/client";

const Web3Login: React.FC = () => {
  const { isConnected, setIsConnected, username, setUsername } =
    useAppContext();

  const connect = async () => {
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

      //todo: create api to return single user
      if (res?.data.length > 0) {
        setUsername(res?.data[0]?.username || publicAddress);
        setIsConnected(true);
      } else {
        throw new Error("user doesnt exist");
      }
    } catch (error) {
      window.alert(error);
      return;
    }
  };

  return (
    <Flex
      minH="100vh"
      minW="100vw"
      justifyContent="center"
      align="center"
      flexDir="column"
    >
      <Button onClick={connect}>
        {isConnected ? username : "Connect Wallet"}
      </Button>
      {isConnected ? (
        <Button onClick={connect}>Change username</Button>
      ) : undefined}
    </Flex>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <AppProvider>
        <Web3Login />
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
