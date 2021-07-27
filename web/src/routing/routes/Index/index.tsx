import React from "react";
import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";

import PageLayout from "@layouts/PageLayout";

const Index: React.FC = () => {
  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>effective-carnival</title>
      </Helmet>
      <Typography variant="h1">Index page</Typography>
    </PageLayout>
  );
};

export default Index;
