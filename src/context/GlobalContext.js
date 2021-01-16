import React, { useContext } from "react";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);
