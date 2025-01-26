import React, { createContext, useContext, useState } from "react";

// Create Account Context
const AccountContext = createContext();

// Account Provider to wrap the app with authentication logic
export function AccountProvider({ children }) {
  const [account, setAccount] = useState({
    isAnonymous: true,
    username: "",
  });

  // Register function
  const register = (username, password, email, name) => {
    // Implement registration logic (e.g., save user to backend)
    setAccount({ isAnonymous: false, username });
    console.log("User Registered:", username);
  };

  // Login function
  const login = (username, password) => {
    // Implement login logic (e.g., authenticate with backend)
    setAccount({ isAnonymous: false, username });
    console.log("User Logged In:", username);
  };

  // Logout function
  const logout = () => {
    setAccount({ isAnonymous: true, username: "" });
    console.log("User Logged Out");
  };

  return (
    <AccountContext.Provider value={{ account, login, register, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

// Hook to use account context
export const useAccount = () => useContext(AccountContext);
