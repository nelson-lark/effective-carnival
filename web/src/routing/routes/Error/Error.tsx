import React from "react";

import { Box, Button, Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";

import PageLayout from "@layouts/PageLayout";

import useStyles from "./styles";

interface LocationState {
  title?: string;
  description?: string;
}

const Error: React.FC = () => {
  const { state } = useLocation<LocationState>();

  const { t } = useTranslation(["common", "auth"]);

  const classes = useStyles();

  return (
    <PageLayout pb={5}>
      <Container maxWidth="xs">
        <Helmet>
          <title>{t("Error")}</title>
        </Helmet>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mx={6}>
            <Typography variant="h3" align="center" gutterBottom paragraph>
              {state?.title || t("Upps, something went wrong")}
            </Typography>
          </Box>
          <Typography variant="body1" align="center" gutterBottom paragraph>
            {state?.description}
          </Typography>
          <Link to={Paths.SIGN_UP_PATH}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              className={classes.buttonSize}>
              {t("auth:Sign up")}
            </Button>
          </Link>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default Error;
