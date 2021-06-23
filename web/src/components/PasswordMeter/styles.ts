import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  boxes: {
    margin: -3,
  },
  box: {
    height: 5,
    margin: 3,
  },
  text: {
    fontSize: "12px",
    lineHeight: "1.3",
    letterSpacing: "0.4",
    color: theme.palette.primary.main,
    marginTop: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
}));
