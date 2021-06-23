import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";
import ForgotPasswordForm, { ForgotPasswordState } from "./ForgotPasswordForm";

interface OnReset {
  onReset(formData: ForgotPasswordState): void;
  disabled: boolean;
}

const ForgotPasswordView: React.FC<OnReset> = ({ onReset, disabled }) => {
  const { t } = useTranslation("auth");

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Forgot password")}</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box
          px={2}
          boxSizing="border-box"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Typography color="textPrimary" gutterBottom variant="h2" paragraph>
            {t("Forgot your password?")}
          </Typography>
          <Typography variant="body1">
            {t("Please write email you used during create account process")}
          </Typography>
        </Box>
        <ForgotPasswordForm onReset={onReset} disabled={disabled} />
      </Container>
    </PageLayout>
  );
};

export default ForgotPasswordView;
