import React, { useEffect, useRef, useState } from "react";

import { Redirect, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Auth } from "aws-amplify";

import { Box, Button, Container, Typography } from "@material-ui/core";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";

import { DISABLE_RESEND_EMAIL_TIMEOUT_MILLISECONDS } from "@consts/index";

import { recordEvent } from "@utils/analytics";

import PageLayout from "@layouts/PageLayout";

import InfoBox from "@components/InfoBox";

import { Mail } from "@material-ui/icons";
import useStyle from "./styles";

interface LocationState {
  email?: string;
}

const VerifyEmail: React.FC = () => {
  const classes = useStyle();
  const { state } = useLocation<LocationState>();

  const [disabled, setDisabled] = useState<boolean>(true);

  const timer = useRef<number>();

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setDisabled(false);
    }, DISABLE_RESEND_EMAIL_TIMEOUT_MILLISECONDS);

    return () => {
      clearTimeout(timer.current);
    };
  }, [disabled, timer]);

  async function handleResendEmail() {
    try {
      setDisabled(true);

      await Auth.resendSignUp(state.email!);

      recordEvent({
        name: AnalyticsEventName.ResendSignUp,
        result: AnalyticsEventResult.Success,
      });
    } catch (err) {
      setDisabled(false);

      clearTimeout(timer.current);

      recordEvent({
        name: AnalyticsEventName.ResendSignUp,
        result: AnalyticsEventResult.Failure,
      });
    }
  }

  if (!state?.email) return <Redirect to="/" />;

  return (
    <PageLayout pb={5}>
      <Container maxWidth="xs">
        <Helmet>
          <title>Verify email</title>
        </Helmet>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mt={1}>
            <Mail />
          </Box>
          <Typography variant="h2" gutterBottom>
            Verify your email
          </Typography>
          <Box px={2}>
            <Typography variant="body1" align="center">
              If you have not registered before, we will send you a verification
              email to the address below.
            </Typography>
          </Box>

          <Box
            border="solid 1px"
            pt={1.1}
            pb={1.3}
            my={1.5}
            textAlign="center"
            width="90%">
            <Typography variant="body1" className={classes.email}>
              {state?.email}
            </Typography>
          </Box>
          <Typography variant="body1">
            Use sent link to confirm your registration.
          </Typography>
          <InfoBox text="If you do not see an email from us, please check your email address and SPAM folder. You can also resend the verification email." />
          <Box mt={1}>
            <Button
              data-testid="resend-email-button"
              onClick={handleResendEmail}
              disabled={disabled}
              variant="text">
              Resend email
            </Button>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default VerifyEmail;
