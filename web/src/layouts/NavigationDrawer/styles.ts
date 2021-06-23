import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: theme.spacing(32),
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.spacing(32),
  },
  drawerHeader: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

export default useStyles;
