import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    minHeight: theme.spacing(6),
    overflow: "hidden",
    marginBottom: theme.spacing(1),
    minWidth: 475,
    backgroundColor: theme.palette.error.dark,
  },
  text: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
  },
  actionButtons: {
    flexShrink: 0,
    marginLeft: theme.spacing(1),
  },
}));
