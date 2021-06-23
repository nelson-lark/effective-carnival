import React from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@material-ui/core";

import Button from "./Button";
import useStyles from "./styles";

interface Props {
  buttonText: string;
  buttonLinkPath: string;
  text: string;
  dataTestId?: string;
}

const AuthBottomBar: React.FC<Props> = ({
  buttonLinkPath,
  buttonText,
  text,
  dataTestId,
}) => {
  const { t } = useTranslation("auth");
  const classes = useStyles();

  return (
    <Box py={2.125} className={classes.bar}>
      <Grid alignItems="center" justify="center" spacing={2} container>
        <Grid item>
          <Typography className={classes.text}>{t(text)}</Typography>
        </Grid>
        <Grid item>
          <Link to={buttonLinkPath} className={classes.link}>
            <Button dataTestId={dataTestId}>{buttonText}</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthBottomBar;
