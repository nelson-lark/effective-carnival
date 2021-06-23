import React from "react";

import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";

import WaitingView from "@components/WaitingView";

const ConfirmReset: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <PageLayout pb={7}>
      <Helmet>
        <title>{t("Resetting your password")}</title>
      </Helmet>
      <WaitingView
        title={t("Resetting your password")}
        content={t(
          "If provided email does exists in our database then we will sent reset lin on it. You can close this page now."
        )}
      />
    </PageLayout>
  );
};

export default ConfirmReset;
