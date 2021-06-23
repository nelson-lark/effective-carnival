import { makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
  },
}));

export default useStyle;
