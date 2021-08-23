import React, { useEffect } from "react";

import { Auth } from "aws-amplify";
import { Helmet } from "react-helmet";
import { Redirect, useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import AuthLayout from "@layouts/AuthLayout";

import Paths from "@routing/paths";

import useQuery from "@utils/useQuery";
import { recordEvent } from "@utils/analytics";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";

import WaitingView from "@components/WaitingView";

const ConfirmSignUp: React.FC = () => {
  const history = useHistory();
  const query = useQuery();

  const { t } = useTranslation("auth");

  const username: string | null = query.get("username");
  const code: string | null = query.get("code");

  useEffect(() => {
    (async () => {
      if (username && code) {
        try {
          await Auth.confirmSignUp(username, code);
          // TODO set success message context?
          recordEvent({
            name: AnalyticsEventName.ConfirmSignUp,
            result: AnalyticsEventResult.Success,
          });

          history.replace(Paths.SIGN_IN_PATH);
        } catch (e) {
          recordEvent({
            name: AnalyticsEventName.ConfirmSignUp,
            result: AnalyticsEventResult.Failure,
          });
          history.push(Paths.ERROR_PATH);
        }
      }
    })();
  }, [code, history, username]);

  if (!username || !code) return <Redirect to="/" />;

  return (
    <AuthLayout>
      <Helmet>
        <title>{t("Verifying your email")}</title>
      </Helmet>
      <WaitingView
        title={t("Please be patient for a while")}
        content={t("We are currently verifying your email.")}
      />
    </AuthLayout>
  );
};

export default ConfirmSignUp;
