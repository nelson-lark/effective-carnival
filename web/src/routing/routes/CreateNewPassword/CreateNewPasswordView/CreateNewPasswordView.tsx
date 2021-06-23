import React from "react";

import { Box, Container, Typography } from "@material-ui/core";

import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

import PageLayout from "@layouts/PageLayout";

import CreateNewPasswordForm from "./CreateaNewPasswordForm";
import CreateNewPasswordState from "./CreateaNewPasswordForm/CreateNewPasswordState";

interface Props {
  onSavePassword(formData: CreateNewPasswordState): void;
}

const CreateNewPasswordView: React.FC<Props> = ({ onSavePassword }) => {
  const { t } = useTranslation("auth");

  return (
    <PageLayout pb={5}>
      <Helmet>
        <title>{t("Create new password")}</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box px={2}>
            <Typography variant="h2" gutterBottom paragraph>
              {t("Create new password")}
            </Typography>
            <Typography variant="body1" gutterBottom paragraph>
              {t("Your password must be")}
            </Typography>
          </Box>
          <CreateNewPasswordForm onSavePassword={onSavePassword} />
        </Box>
      </Container>
    </PageLayout>
  );
};

export default CreateNewPasswordView;
