import createPalette from "@material-ui/core/styles/createPalette";

const lightPalette = createPalette({
  type: "light",
  secondary: {
    main: "#115293",
  },
});

const darkPalette = createPalette({
  type: "dark",
  primary: {
    main: "rgba(187, 134, 252, 0.36)",
    light: "#BB86FC",
    contrastText: "#fff",
  },
  secondary: {
    main: "#BB86FC",
  },
  error: {
    main: "#CF6679",
  },
  background: {
    default: "#121212",
    paper: "#121212",
  },
});

const palette = {
  dark: darkPalette,
  light: lightPalette,
} as const;

export default palette;
