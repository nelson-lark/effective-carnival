import React, { useState } from "react";

import { Auth } from "aws-amplify";

import getSocialProviderByPlatform from "@utils/getSocialProviderByPlatform";
import removeAllWhitespaces from "@utils/removeAllWhitespaces";

import { recordEvent } from "@utils/analytics";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";
import SocialPlatform from "@enums/SocialPlatform";

import SignInView from "./SignInView";

import { SignInFormState } from "./SignInView/SignInForm";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSignIn = async ({ email, password }: SignInFormState) => {
    try {
      setLoading(true);
      setError("");

      await Auth.signIn({
        password: password.trim(),
        username: removeAllWhitespaces(email).toLowerCase(),
      });

      recordEvent({
        name: AnalyticsEventName.SignIn,
        result: AnalyticsEventResult.Success,
      });
    } catch (e) {
      recordEvent({
        name: AnalyticsEventName.SignIn,
        result: AnalyticsEventResult.Failure,
      });

      setLoading(false);
      setError(e.message);
    }
  };

  const onSocialSignIn = async (socialPlatform: SocialPlatform) => {
    try {
      await Auth.federatedSignIn({
        provider: getSocialProviderByPlatform(socialPlatform),
      });
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <SignInView
      error={error}
      loading={loading}
      onSignIn={onSignIn}
      onSocialSignIn={onSocialSignIn}
    />
  );
};

export default SignIn;
