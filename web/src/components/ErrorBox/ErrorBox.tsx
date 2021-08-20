import React, { forwardRef, ReactNode } from "react";
import { Box, IconButton, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

import useStyles from "./styles";

interface Props {
  className?: string;
  icon?: ReactNode;
  onClose?(): void;
}

const ErrorBox: React.FC<Props> = forwardRef(
  ({ children, className, onClose }, ref) => {
    const classes = useStyles();

    return (
      <Paper className={clsx(classes.root, className)} ref={ref}>
        <div className={classes.text}>
          {children}
          {onClose && (
            <Box className={classes.actionButtons}>
              <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </div>
      </Paper>
    );
  }
);

export default ErrorBox;
