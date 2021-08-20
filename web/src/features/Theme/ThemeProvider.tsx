import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";

import rtl from "jss-rtl";
import { create } from "jss";
import { StylesProvider, jssPreset, Theme } from "@material-ui/core/styles";

import palette from "@themes/palette";
import createDefaultTheme from "@themes/defaultTheme";

export interface ThemeContextValue {
  theme: Theme;
  direction: "rtl" | "ltr";
  toggleDirection(): void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: createDefaultTheme(),
  direction: "ltr",
  toggleDirection() {},
});

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const [direction, setDirection] = useState<"rtl" | "ltr">(dir);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createDefaultTheme({
        direction,
        palette: palette[prefersDarkMode ? "dark" : "light"],
      }),
    [direction, prefersDarkMode]
  );

  const jss = useMemo(
    () =>
      create({
        plugins: [
          ...jssPreset().plugins,
          rtl({ enabled: direction === "rtl" }),
        ],
      }),
    [direction]
  );

  const toggleDirection = useCallback(
    () => setDirection((prevState) => (prevState === "rtl" ? "ltr" : "rtl")),
    []
  );

  useEffect(() => {
    setDirection(dir);
  }, [dir]);

  useEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  return (
    <ThemeContext.Provider value={{ theme, direction, toggleDirection }}>
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StylesProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
