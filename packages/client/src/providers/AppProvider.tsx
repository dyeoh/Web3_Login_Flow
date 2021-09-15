import React, { createContext, useContext, useState } from "react";

export interface AppContextType {
  isConnected: boolean;
  setIsConnected: (state: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  return (
    <AppContext.Provider
      value={{ isConnected, setIsConnected, username, setUsername }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("context must be used within provider");
  return context;
};
