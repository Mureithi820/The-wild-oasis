import { useContext } from "react";
import { DarkModeContext } from "./DarkmodeContext";
// import { DarkModeContext } from "./DarkModeContext";

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode context was used outside dark mode provider");
  return context;
}

export { useDarkMode };
