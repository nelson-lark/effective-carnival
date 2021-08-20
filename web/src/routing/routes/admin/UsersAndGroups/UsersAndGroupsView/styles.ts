import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  tabHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabHeaderAction: {
    "& > button": {
      marginRight: theme.spacing(2),
    },
  },
  panel: {
    padding: 0,
  },
}));

export default useStyles;
