import React from "react";

import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";

import Link from "@components/Link";
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
      <Grid container justifyContent="flex-end" spacing={1}>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item>
          <Link to={Paths.FORGOT_PASSWORD_PATH}>
            <Button
              variant="text"
              color="secondary"
              data-testid="forgot-password-button"
              className={classes.forgot}>
              {t("Forgot Password?")}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SignInForm;
