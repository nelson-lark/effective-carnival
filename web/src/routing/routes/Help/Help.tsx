import React from "react";
import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";

const Help: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Help")}</title>
      </Helmet>
      <Typography variant="h1">{t("Help")}</Typography>
    </PageLayout>
  );
};

export default Help;
