import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 5px 5px -5px rgba(117, 80, 233, 0.29)",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      boxShadow: "0 10px 10px -5px rgba(117, 80, 233, 0.29)",
    },
    minWidth: 122,
  },
  label: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));
