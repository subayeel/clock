import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  console.log(localStorage.getItem("dark"));
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );
  useEffect(() => {
    if (localStorage.getItem("dark") === null) {
      localStorage.setItem("dark", true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
