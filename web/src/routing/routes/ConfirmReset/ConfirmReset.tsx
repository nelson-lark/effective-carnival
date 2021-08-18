import React from "react";

import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

import { Box, Button } from "@material-ui/core";

import PageLayout from "@layouts/PageLayout";

import Paths from "@routing/paths";

import Link from "@components/Link";
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
        )}>
        <Box mt={3.5}>
          <Link to={Paths.SIGN_IN_PATH}>
            <Button
              color="primary"
              variant="text"
              data-testid="back-to-sigg-in-button">
              {t("Back to sign in page")}
            </Button>
          </Link>
        </Box>
      </WaitingView>
    </PageLayout>
  );
};

export default ConfirmReset;
