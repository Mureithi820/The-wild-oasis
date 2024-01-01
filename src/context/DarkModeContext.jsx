import PropTypes from "prop-types";

import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
// import { useDarkMode } from "./useDarkMode";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// function useDarkMode() {
//   const context = useContext(DarkModeContext);
//   if (context === undefined)
//     throw new Error("Dark mode coxtext was used outside darkmode provider");
//   return context;
// }
export { DarkModeProvider, DarkModeContext };
