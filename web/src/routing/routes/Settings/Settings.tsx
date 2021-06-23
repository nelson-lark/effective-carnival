import React from "react";
import { Helmet } from "react-helmet";

import { Typography } from "@material-ui/core";

import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";
import ChangeDirectionSection from "@components/ChangeDirectionSection";
import ChangeLanguageSection from "@components/ChangeLanguageSection";

const Settings: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Settings")}</title>
      </Helmet>
      <Typography variant="h1">{t("Settings")}</Typography>
      <ChangeLanguageSection />
      <ChangeDirectionSection />
    </PageLayout>
  );
};

export default Settings;
