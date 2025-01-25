import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({
    username: "",
    shippingAddress: "",
    isAnonymous: true,
  });

  const createAccount = (username, shippingAddress) => {
    setAccount({
      username,
      shippingAddress,
      isAnonymous: false,
    });
  };

  const updateAccount = (shippingAddress) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      shippingAddress,
    }));
  };

  const logout = () => {
    setAccount({
      username: "",
      shippingAddress: "",
      isAnonymous: true,
    });
  };

  return (
    <AccountContext.Provider value={{ account, createAccount, updateAccount, logout }}>
      {children}
    </AccountContext.Provider>
  );
};