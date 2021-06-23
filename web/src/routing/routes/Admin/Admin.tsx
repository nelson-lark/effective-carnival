import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";
import FeedbackView from "./FeedbacksView";
import { useGetAllFeedbacksQuery } from "./graphql/queries.generated";

const Admin: React.FC = () => {
  const { t } = useTranslation("common");

  const { data, loading } = useGetAllFeedbacksQuery({
    fetchPolicy: "cache-and-network",
  });

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Admin")}</title>
      </Helmet>
      <FeedbackView feedbacks={data?.feedbacks || []} loading={loading} />
    </PageLayout>
  );
};

export default Admin;
