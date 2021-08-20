import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -10,
  },
  error: {
    height: theme.spacing(3),
  },
  forgot: {
    textTransform: "capitalize",
  },
}));
