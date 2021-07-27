import React from "react";

import { Box, Button } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Form from "@components/Form";
import PasswordField from "@components/PasswordField";

import Paths from "@routing/paths";

import CreateNewPasswordState from "./CreateNewPasswordState";
import createNewPasswordValidationScheme from "./createNewPasswordValidationScheme";

interface Props {
  onSavePassword(formData: CreateNewPasswordState): void;
}

const CreateNewPasswordForm: React.FC<Props> = ({ onSavePassword }) => {
  const history = useHistory();

  const { t } = useTranslation(["auth", "common"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordState>({
    defaultValues: {
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(createNewPasswordValidationScheme()),
  });

  const onSubmit = ({ password, retypePassword }: CreateNewPasswordState) => {
    onSavePassword({ password, retypePassword });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        id="password"
        name="password"
        control={control}
        error={errors.password?.message}
        label={t("Password")}
        placeholder={t("Password")}
        autoComplete="new-password"
        autoFocus
      />
      <PasswordField
        id="retype-password"
        name="retypePassword"
        control={control}
        error={errors.retypePassword?.message}
        label={t("Retype Password")}
        placeholder={t("Retype Password")}
        dataTestId="retype-password-input-field"
        autoComplete="new-password"
        withIcon={false}
        labelWidth={120}
      />
      <Box mt={1.5}>
        <Button
          color="primary"
          type="submit"
          data-testid="save-new-password-button"
          variant="contained"
          fullWidth>
          {t("common:Save")}
        </Button>
      </Box>
      <Box mt={2.5} display="flex" flexDirection="column" alignItems="center">
        <Button
          onClick={() => {
            history.push(Paths.SIGN_IN_PATH);
          }}
          data-testid="cancel-new-password-button"
          variant="text">
          {t("common:Cancel")}
        </Button>
      </Box>
    </Form>
  );
};

export default CreateNewPasswordForm;
