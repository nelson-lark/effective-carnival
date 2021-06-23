import React from "react";
import { Button as MaterialButton } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  children?: React.ReactChildren | string;
  dataTestId?: string;
}

const Button: React.FC<Props> = ({ children, dataTestId }) => {
  const classes = useStyles();

  return (
    <MaterialButton
      data-testid={dataTestId}
      variant="contained"
      classes={classes}>
      {children}
    </MaterialButton>
  );
};

export default Button;
