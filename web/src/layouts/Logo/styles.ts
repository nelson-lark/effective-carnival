import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  logotype: {
    color: theme.palette.grey[100],
    textDecoration: "none",
  },
}));

export default useStyles;
