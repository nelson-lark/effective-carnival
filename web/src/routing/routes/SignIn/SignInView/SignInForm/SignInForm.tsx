import React from "react";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";

import Form from "@components/Form";
import EmailInputField from "@components/EmailInputField";
import PasswordField from "@components/PasswordField";

import SignInFormState from "./SignInFormState";
import signInFormValidationSchema from "./signInFormValidationSchema";

import useStyles from "./styles";

const defaultValues: SignInFormState = {
  email: "",
  password: "",
};

interface Props {
  error: string;
  loading: boolean;
  onSubmit(formData: SignInFormState): void;
}

const SignInForm: React.FC<Props> = ({ error, loading, onSubmit }) => {
  const { t } = useTranslation("auth");

  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormState>({
    resolver: yupResolver(signInFormValidationSchema()),
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <EmailInputField
        name="email"
        autoComplete="email"
        control={control}
        error={errors.email?.message}
        autoFocus
      />
      <PasswordField
        id="password"
        name="password"
        control={control}
        error={errors.password?.message}
        label={t("Password")}
        placeholder={t("Password")}
        autoComplete="current-password"
      />
      <Typography color="error" align="center" className={classes.error}>
        {error ? t(`validation:${error}`) : " "}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Box width="50%" position="relative">
          <Button
            color="primary"
            type="submit"
            data-testid="sign-in-button"
            variant="contained"
            disabled={loading}
            fullWidth>
            {t("Sign in")}
          </Button>
          {loading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </Box>
        <Box display="flex" width="50%" justifyContent="flex-end">
          <Link to={Paths.FORGOT_PASSWORD_PATH}>
            <Button
              color="primary"
              variant="text"
              data-testid="forgot-password-button">
              {t("Forgot Password?")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Form>
  );
};

export default SignInForm;
