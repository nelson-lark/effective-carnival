import React from "react";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@material-ui/core";

import AppleIcon from "@assets/icons/Apple";
import FacebookIcon from "@assets/icons/Facebook";
import GoogleIcon from "@assets/icons/Google";

import SocialPlatform from "@enums/SocialPlatform";

import SocialAuthButton from "./SocialAuthButton";

interface Props {
  labelStartText?: "Sign up" | "Sign in";
  title?: string;
  onSocialClick(platform: SocialPlatform): void;
}

const SocialAuthButtons: React.FC<Props> = ({
  labelStartText = "Sign up",
  title = "Or continue with ...",
  onSocialClick,
}) => {
  const { t } = useTranslation("auth");

  return (
    <Box mb={4} mt={2.25}>
      <Box mb={2.5} px={2} boxSizing="border-box">
        <Typography>{t(title)}</Typography>
      </Box>
      <Grid justify="center" spacing={2} container>
        <Grid xs={4} item>
          <SocialAuthButton
            icon={<FacebookIcon fontSize="inherit" />}
            label={t(`${labelStartText} with Facebook`)}
            dataTestId="sign-up-with-facebook-button"
            onClick={() => onSocialClick(SocialPlatform.Facebook)}>
            Facebook
          </SocialAuthButton>
        </Grid>

        <Grid xs={4} item>
          <SocialAuthButton
            icon={<GoogleIcon fontSize="inherit" />}
            label={t(`${labelStartText} with Google`)}
            dataTestId="sign-up-with-google-button"
            onClick={() => onSocialClick(SocialPlatform.Google)}>
            Google
          </SocialAuthButton>
        </Grid>

        <Grid xs={4} item>
          <SocialAuthButton
            icon={<AppleIcon fontSize="inherit" />}
            label={t(`${labelStartText} with Apple`)}
            dataTestId="sign-up-with-apple-button"
            onClick={() => onSocialClick(SocialPlatform.Apple)}>
            Apple
          </SocialAuthButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialAuthButtons;
