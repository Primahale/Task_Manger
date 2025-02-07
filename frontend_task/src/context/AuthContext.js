import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        console.log("User loaded from storage:", JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    console.log("Logging in:", userData, token); // ✅ Debugging
    if (userData && token) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
    }
  };

  const logout = () => {
    console.log("Logging out..."); // ✅ Debug log
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthProvider;
