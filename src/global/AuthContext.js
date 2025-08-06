import React, { createContext, useState, useEffect, useContext } from "react";
import { authService_user } from "../data-services/authService_user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  // const navigate = useNavigate();
  // Load from localStorage on first render
  useEffect(() => {
    Admin();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function Admin() {
    const ad = await authService_user.getAdminData();
    setAdmin(ad[0]);
  }

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // console.log(user)
  };

  const logout = () => {
    localStorage.removeItem("user");
    //  localStorage.setItem('rememberChecked', JSON.stringify(false));
    setUser(null);
    //  navigate("/Home");
  };

  return (
    <AuthContext.Provider value={{admin, user, setAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
