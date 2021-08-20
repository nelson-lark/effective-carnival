import React from "react";

import { useTranslation } from "react-i18next";

import { Box, Button, Grid, Typography } from "@material-ui/core";

import Link from "@components/Link";

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

  return (
    <Box py={4.75}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item>
          <Typography>{t(text)}</Typography>
        </Grid>
        <Grid item>
          <Link to={buttonLinkPath} underline="none">
            <Button
              data-testid={dataTestId}
              variant="outlined"
              color="secondary">
              {buttonText}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthBottomBar;
