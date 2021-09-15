import Web3 from "web3";

export const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    process.env.WEB_SOCKET_URL || "wss://localhost:8545'"
  )
);

export default web3;
