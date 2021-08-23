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

  const { t } = useTranslation(["auth", "common", "field"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordState>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(createNewPasswordValidationScheme()),
  });

  const onSubmit = ({ password, confirmPassword }: CreateNewPasswordState) => {
    onSavePassword({ password, confirmPassword });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        id="password"
        name="password"
        control={control}
        error={errors.password?.message}
        label={t("field:Password")}
        placeholder={t("field:Password")}
        autoComplete="new-password"
        autoFocus
      />
      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        control={control}
        error={errors.confirmPassword?.message}
        label={t("field:Confirm Password")}
        placeholder={t("field:Confirm Password")}
        dataTestId="confirm-password-input-field"
        adornmentDataTestId="show-confirm-password-button"
        autoComplete="new-password"
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
          variant="text"
          color="secondary"
          fullWidth>
          {t("common:Cancel")}
        </Button>
      </Box>
    </Form>
  );
};

export default CreateNewPasswordForm;
