import { createTheme, Theme, ThemeOptions } from "@material-ui/core/styles";

const createDefaultTheme = (options?: ThemeOptions): Theme =>
  createTheme(options);

export default createDefaultTheme;
