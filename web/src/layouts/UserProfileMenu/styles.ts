import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  avatarButton: {
    padding: theme.spacing(0),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
