import React, { useEffect, useRef, useState } from "react";

import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import Paths from "@routing/paths";

import { DISABLE_RESEND_EMAIL_TIMEOUT_MILLISECONDS } from "@consts/index";

import removeAllWhitespaces from "@utils/removeAllWhitespaces";

import { recordEvent } from "@utils/analytics";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";

import ForgotPasswordView from "./ForgotPasswordView";
import ForgotPasswordState from "./ForgotPasswordView/ForgotPasswordForm/ForgotPasswordState";

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const [disabled, setDisabled] = useState<boolean>(false);

  const timer = useRef<number>();

  useEffect(() => clearTimeout(timer.current));

  const onResetPassword = async ({ email }: ForgotPasswordState) => {
    try {
      setDisabled(true);

      await Auth.forgotPassword(removeAllWhitespaces(email).toLowerCase());

      recordEvent({
        name: AnalyticsEventName.ForgotPassword,
        result: AnalyticsEventResult.Success,
      });
      history.push(Paths.CONFIRM_RESET_PASSWORD_PATH);
    } catch (e) {
      recordEvent({
        name: AnalyticsEventName.ForgotPassword,
        result: AnalyticsEventResult.Failure,
      });
    } finally {
      timer.current = window.setTimeout(
        () => setDisabled(false),
        DISABLE_RESEND_EMAIL_TIMEOUT_MILLISECONDS
      );
    }
  };

  return <ForgotPasswordView onReset={onResetPassword} disabled={disabled} />;
};

export default ForgotPassword;
