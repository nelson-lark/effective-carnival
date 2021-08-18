import React from "react";
import { Button, Tooltip } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  label: string;
  dataTestId?: string;
  onClick: () => void;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const SocialAuthButton: React.FC<Props> = ({
  children,
  label,
  onClick,
  icon,
  dataTestId,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={label}>
      <Button
        aria-label={label}
        classes={classes}
        size="large"
        data-testid={dataTestId}
        variant="outlined"
        onClick={onClick}
        startIcon={icon}
        fullWidth>
        {children}
      </Button>
    </Tooltip>
  );
};

export default SocialAuthButton;
