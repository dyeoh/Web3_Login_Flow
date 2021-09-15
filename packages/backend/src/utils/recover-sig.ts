import web3 from "./web3-client";

export const recoverAddress = (message: string, signature: string): string => {
  return web3.eth.accounts.recover(message, signature);
};

export default recoverAddress;
