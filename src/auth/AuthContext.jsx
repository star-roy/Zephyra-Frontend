import React, { createContext, useContext } from "react";

// 👇 Move this inside the Provider — DO NOT export directly
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = false; // or localStorage.getItem('auth')

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Only export this custom hook (okay for Fast Refresh)
export const useAuth = () => {
  return useContext(AuthContext);
};
