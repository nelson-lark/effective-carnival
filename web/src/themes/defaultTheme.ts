import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core/styles";

const createDefaultTheme = (options?: ThemeOptions): Theme =>
  createMuiTheme(options);

export default createDefaultTheme;
