import React from "react";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";
import UsersAndGroupsView from "./UsersAndGroupsView";

const UsersAndGroups: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <PageLayout maxWidth="lg">
      <Helmet>
        <title>{t("Users and Groups")}</title>
      </Helmet>
      <UsersAndGroupsView />
    </PageLayout>
  );
};

export default UsersAndGroups;
