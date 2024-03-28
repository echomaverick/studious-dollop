import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const login = (email) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setLoggedIn(false);
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
