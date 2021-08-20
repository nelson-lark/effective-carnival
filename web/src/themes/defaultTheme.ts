import { createTheme, Theme, ThemeOptions } from "@material-ui/core/styles";
import { Overrides } from "@material-ui/core/styles/overrides";

const overrides: Overrides = {
  MuiTableCell: {
    head: {
      fontWeight: "bold",
    },
    stickyHeader: {
      backgroundColor: "inherit",
    },
  },
};

const createDefaultTheme = (options?: ThemeOptions): Theme =>
  createTheme({ ...options, overrides });

export default createDefaultTheme;
