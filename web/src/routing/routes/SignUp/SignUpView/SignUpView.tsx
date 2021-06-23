import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";

import PageLayout from "@layouts/PageLayout";

import AuthBottomBar from "@components/AuthBottomBar";

import SignUpForm, { SignUpFormState } from "./SignUpForm";

interface Props {
  loading: boolean;
  onSignUp(formData: SignUpFormState): void;
}

const SignUpView: React.FC<Props> = ({ loading, onSignUp }) => {
  const { t } = useTranslation("auth");

  return (
    <PageLayout>
      <Helmet>
        <title>{t("Create your account")}</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h1">
            {t("Create your account")}
          </Typography>
          <Typography gutterBottom>
            {t("Enjoy a fast and simple registration.")}
          </Typography>
        </Box>
        <SignUpForm loading={loading} onSubmit={onSignUp} />
      </Container>
      <AuthBottomBar
        text="Already have an account?"
        buttonLinkPath={Paths.SIGN_IN_PATH}
        buttonText={t("Sign in")}
        dataTestId="go-to-sign-in-page-button"
      />
    </PageLayout>
  );
};

export default SignUpView;
