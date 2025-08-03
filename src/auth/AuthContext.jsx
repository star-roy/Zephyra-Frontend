import React, { createContext, useContext, useState } from "react";

// 👇 Move this inside the Provider — DO NOT export directly
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = true; // or localStorage.getItem('auth')
  
  // Demo user data - you can switch between different roles for testing
  const [currentUser] = useState({
    id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
    fullName: 'Demo User',
    role: 'super_admin', // Change this to 'user', 'admin', or 'super_admin' for testing
    status: 'active'
  });

  const logout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user: currentUser, 
      isAuthenticated: isLoggedIn,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Only export this custom hook (okay for Fast Refresh)
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export AuthContext for AdminRoute to use
export { AuthContext };
