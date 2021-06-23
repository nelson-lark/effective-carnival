import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  bar: {
    backgroundColor: theme.palette.common.black[500],
  },
  text: {
    fontWeight: 500,
  },
  link: {
    textDecoration: "none",
  },
}));
