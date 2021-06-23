import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Logo: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.title}>
      <Link
        to="/"
        data-testid="logo-link-in-side-menu"
        className={classes.logotype}>
        EffectiveCarnival
      </Link>
    </Typography>
  );
};

export default Logo;
