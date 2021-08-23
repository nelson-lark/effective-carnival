import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Form from "@components/Form";
import EmailInputField from "@components/EmailInputField";

import Paths from "@routing/paths";

import forgotPasswordValidationSchema from "./forgotPasswordValidationSchema";
import ForgotPasswordState from "./ForgotPasswordState";

interface Props {
  onReset(formData: ForgotPasswordState): void;
  disabled: boolean;
}

const ForgotPasswordForm: React.FC<Props> = ({ onReset, disabled }) => {
  const { t } = useTranslation("auth");

  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordState>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordValidationSchema()),
  });

  return (
    <Form onSubmit={handleSubmit(onReset)}>
      <Box mx={1} mt={1}>
        <EmailInputField
          name="email"
          autoComplete="email"
          control={control}
          error={errors.email?.message}
          autoFocus
        />
        <Box mt={1.5}>
          <Button
            color="primary"
            type="submit"
            data-testid="reset-password-button"
            variant="contained"
            fullWidth
            disabled={disabled}>
            {t("Reset password")}
          </Button>
        </Box>
        <Box mt={2.5} display="flex" flexDirection="column" alignItems="center">
          <Button
            data-testid="go-to-sign-in-page-button"
            onClick={() => {
              history.push(Paths.SIGN_IN_PATH);
            }}
            variant="text"
            color="secondary"
            fullWidth>
            {t("Back to sign in page")}
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ForgotPasswordForm;
