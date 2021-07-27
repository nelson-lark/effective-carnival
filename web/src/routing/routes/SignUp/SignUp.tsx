import React, { useState } from "react";

import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import Paths from "@routing/paths";

import removeAllWhitespaces from "@utils/removeAllWhitespaces";

import { recordEvent } from "@utils/analytics";

import AnalyticsEventName from "@enums/AnalyticsEventName";

import { NUMBER_PREFIX_INPUT_KEY } from "@consts/index";

import { useTranslation } from "react-i18next";

import SignUpView from "./SignUpView";

import { SignUpFormState } from "./SignUpView/SignUpForm";

const SignUp: React.FC = () => {
  const history = useHistory();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async ({ email, password, phone }: SignUpFormState) => {
    if (loading) return;

    setLoading(true);

    const lowerCaseEmail = removeAllWhitespaces(email).toLowerCase();

    try {
      await Auth.signUp({
        password: password.trim(),
        username: lowerCaseEmail,
        attributes: {
          email: lowerCaseEmail,
          phone_number: removeAllWhitespaces(phone!),
          locale: i18n.language,
        },
      });
      setLoading(false);

      recordEvent({ name: AnalyticsEventName.SignUp, method: "form" });
      history.push(Paths.VERIFY_EMAIL_PATH, {
        email,
      });
      setTimeout(() => {
        localStorage.removeItem(NUMBER_PREFIX_INPUT_KEY);
      }, 500);
    } catch (error) {
      if (error.code === "UsernameExistsException") {
        history.push(Paths.VERIFY_EMAIL_PATH, { email });
      }
      setLoading(false);
    }
  };

  return (
    <SignUpView
      loading={loading}
      onSignUp={onSignUp}
    />
  );
};

export default SignUp;
