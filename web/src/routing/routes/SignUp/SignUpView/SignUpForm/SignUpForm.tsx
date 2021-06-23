import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { PRIVACY_POLICY_LINK, TERMS_OF_USE_LINK } from "@consts/index";

import Form from "@components/Form";
import EmailInputField from "@components/EmailInputField";
import PasswordField from "@components/PasswordField";
import PasswordMeter from "@components/PasswordMeter";
import PhoneNumberField from "@components/PhoneNumberField";

import SignUpFormState from "./SignUpFormState";
import signUpFormValidationSchema from "./signUpFormValidationSchema";
import useStyles from "./styles";

const defaultValues: SignUpFormState = {
  email: "",
  phone: "",
  password: "",
};

interface Props {
  loading: boolean;
  onSubmit(formData: SignUpFormState): void;
}

const SignUpForm: React.FC<Props> = ({ loading, onSubmit }) => {
  const { t } = useTranslation(["auth", "common"]);

  const classes = useStyles();

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormState>({
    resolver: yupResolver(signUpFormValidationSchema()),
    defaultValues,
  });

  const watchPassword = watch("password");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <EmailInputField
        name="email"
        autoComplete="email"
        control={control}
        error={errors.email?.message}
        autoFocus
      />
      <PhoneNumberField
        setValue={setValue}
        getValues={getValues}
        name="phone"
        control={control}
        error={errors.phone?.message}
        required
      />
      <PasswordField
        id="password"
        name="password"
        control={control}
        error={errors.password?.message}
        label={t("Password")}
        placeholder={t("Password")}
        autoComplete="new-password"
      />
      <PasswordMeter
        password={watchPassword}
        visible={!!errors?.password}
        validation={["(?=.*[a-z])", "(?=.*[A-Z])", "(?=.*[0-9])", "(?=.{10,})"]}
      />
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Box mr={2} position="relative">
          <Button
            color="primary"
            type="submit"
            data-testid="sign-up-button"
            variant="contained"
            disabled={loading}>
            {t("Sign up")}
          </Button>
          {loading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </Box>
        <Box>
          <Typography variant="body2">
            {t("By signing up, you’re agree to our")}{" "}
            <Link color="primary" href={TERMS_OF_USE_LINK}>
              {t("Terms of Use")}
            </Link>{" "}
            {t("common:and")}{" "}
            <Link color="primary" href={PRIVACY_POLICY_LINK}>
              {t("Privacy Policy")}
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Form>
  );
};

export default SignUpForm;
