import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchToolbar: {
    display: "flex",
    marginLeft: theme.spacing(4),
  },
  select: {
    width: theme.spacing(17),
    marginRight: theme.spacing(2),
  },
  valueWrapper: {
    width: theme.spacing(34),
    "& > div": {
      height: theme.spacing(6),
    },
  },
  input: {
    "& > div": {
      paddingLeft: theme.spacing(1),
    },
  },
  valueSelect: {
    padding: theme.spacing(0, 1),
    "& > svg": {
      right: theme.spacing(1),
    },
  },
}));

export default useStyles;
