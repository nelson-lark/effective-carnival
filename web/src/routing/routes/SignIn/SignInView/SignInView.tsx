import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";
import SocialPlatform from "@enums/SocialPlatform";

import AuthLayout from "@layouts/AuthLayout";

import AuthBottomBar from "@components/AuthBottomBar";
import SocialAuthButtons from "@components/SocialAuthButtons";

import SignInForm, { SignInFormState } from "./SignInForm";

interface Props {
  error: string;
  loading: boolean;
  onSignIn(formData: SignInFormState): void;
  onSocialSignIn(platform: SocialPlatform): void;
}

const SignInView: React.FC<Props> = ({
  error,
  loading,
  onSignIn,
  onSocialSignIn,
}) => {
  const { t } = useTranslation("auth");

  return (
    <AuthLayout>
      <Helmet>
        <title>{t("Sign in")}</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h4">
            {t("Sign in")}
          </Typography>
        </Box>
        <SignInForm error={error} loading={loading} onSubmit={onSignIn} />
        <SocialAuthButtons
          onSocialClick={onSocialSignIn}
          labelStartText="Sign in"
        />
      </Container>
      <AuthBottomBar
        text="Don't have an account?"
        buttonLinkPath={Paths.SIGN_UP_PATH}
        buttonText={t("Sign up")}
        dataTestId="go-to-sign-up-page-button"
      />
    </AuthLayout>
  );
};

export default SignInView;
