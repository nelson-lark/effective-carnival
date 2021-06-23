import { useContext } from "react";
import { ThemeContext, ThemeContextValue } from "./ThemeProvider";

const useThemeContext = (): ThemeContextValue => {
  return useContext(ThemeContext);
};

export default useThemeContext;
