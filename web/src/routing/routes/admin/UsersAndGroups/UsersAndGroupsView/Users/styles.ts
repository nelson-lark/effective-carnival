import { makeStyles } from "@material-ui/core/styles";

const topMenuHeight = 64;
const tableTabsHeight = 90;
const tableToolbarHeight = 62;
const totalHeight = topMenuHeight + tableTabsHeight + tableToolbarHeight;

const useStyles = makeStyles((theme) => ({
  positive: {
    color:
      theme.palette.primary[theme.palette.type === "dark" ? "light" : "main"],
  },
  negative: {
    color: theme.palette.error[theme.palette.type === "dark" ? "main" : "dark"],
  },
  count: {
    fontWeight: "bold",
  },
  container: {
    maxHeight: `calc(100vh - ${totalHeight}px)`,
  },
  tRow: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;
