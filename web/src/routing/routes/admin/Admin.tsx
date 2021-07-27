import React, { useState } from "react";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";

import FeedbackView from "./FeedbacksView";
import { useGetAllFeedbacksQuery } from "./graphql/queries.generated";

const Admin: React.FC = () => {
  const { t } = useTranslation("common");

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data, loading } = useGetAllFeedbacksQuery({
    variables: {
      paginationInput: {
        limit: rowsPerPage,
        offset: page * rowsPerPage,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Admin")}</title>
      </Helmet>
      <FeedbackView
        feedbacks={data?.feedbacks.items ?? []}
        loading={loading}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={data?.feedbacks.totalCount ?? 0}
      />
    </PageLayout>
  );
};

export default Admin;
