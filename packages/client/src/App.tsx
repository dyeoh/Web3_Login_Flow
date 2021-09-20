import "./App.css";

import { Button, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import Web3 from "web3";

import { AppProvider, useAppContext } from "./providers/AppProvider";
import APIClient from "./utils/client";

const getAddress = async () => {
  await (window as any).ethereum.enable();

  // We don't know window.web3 version, so we use our own instance of Web3
  // with the injected provider given by MetaMask
  const provider = new Web3((window as any).ethereum);

  const coinbase = await provider.eth.getCoinbase();
  if (!coinbase) {
    throw new Error("Please activate MetaMask first.");
  }
  return coinbase.toLowerCase();
};

const signMessage = async (message: string, publicAddress: string) => {
  await (window as any).ethereum.enable();

  // We don't know window.web3 version, so we use our own instance of Web3
  // with the injected provider given by MetaMask
  const provider = new Web3((window as any).ethereum);

  //Metamask doesnt expect a password so leave blank
  return provider.eth.personal.sign(message, publicAddress, "");
};

const Web3Login: React.FC = () => {
  const { isConnected, setIsConnected, username, setUsername } =
    useAppContext();

  const connect = async () => {
    try {
      const publicAddress = await getAddress();

      const res = await APIClient.get("/users", {
        params: { publicAddress },
      });

      //todo: create api to return single user
      if (res?.data.length > 0) {
        await login();
      } else {
        await register(publicAddress);

        //throw new Error("user doesnt exist");
      }
    } catch (error) {
      window.alert(error);
      return;
    }
  };

  const login = async () => {
    try {
      const publicAddress = await getAddress();

      const res = await APIClient.get("/users", {
        params: { publicAddress },
      });

      //todo: create api to return single user
      if (res?.data.length > 0 || !publicAddress) {
        const signature = await signMessage(
          res?.data[0]?.nonce.toString(),
          publicAddress
        );
        await APIClient.post("/users/login", {
          signature,
          publicAddress,
        });
        setUsername(publicAddress);
        setIsConnected(true);
      } else {
        throw new Error("user doesnt exist");
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const register = async (publicAddress: string) => {
    try {
      await APIClient.post("/users", {
        publicAddress,
      });
    } catch (err) {
      window.alert(err);
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
