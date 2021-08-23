import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import AuthLayout from "@layouts/AuthLayout";
import ForgotPasswordForm, { ForgotPasswordState } from "./ForgotPasswordForm";

interface OnReset {
  onReset(formData: ForgotPasswordState): void;
  disabled: boolean;
}

const ForgotPasswordView: React.FC<OnReset> = ({ onReset, disabled }) => {
  const { t } = useTranslation("auth");

  return (
    <AuthLayout>
      <Helmet>
        <title>{t("Forgot password")}</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box
          px={2}
          boxSizing="border-box"
          display="flex"
          flexDirection="column">
          <Typography color="textPrimary" gutterBottom variant="h4">
            {t("Forgot your password?")}
          </Typography>
          <Typography variant="body1">
            {t("Please write email you used during create account process")}
          </Typography>
        </Box>
        <ForgotPasswordForm onReset={onReset} disabled={disabled} />
      </Container>
    </AuthLayout>
  );
};

export default ForgotPasswordView;
