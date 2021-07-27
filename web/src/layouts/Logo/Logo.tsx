import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";

interface Props {
  dataTestId?: string;
}

const Logo: React.FC<Props> = ({ dataTestId = "logo-link-in-side-menu" }) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.title}>
      <Link to="/" data-testid={dataTestId} className={classes.logotype}>
        effective-carnival
      </Link>
    </Typography>
  );
};

export default Logo;
