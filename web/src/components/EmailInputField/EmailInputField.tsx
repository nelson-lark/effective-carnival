import React from "react";

import { InputAdornment } from "@material-ui/core";
import { Control, FieldValues, Path } from "react-hook-form";

import MailIcon from "@material-ui/icons/Mail";

import FormTextInputField from "@components/FormTextInputField";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
  autoFocus?: boolean;
  type?: "text" | "email";
  placeholder?: string;
  label?: string;
  dataTestId?: string;
  autoComplete?: string;
  disabled?: boolean;
}

const EmailInputField = <T extends FieldValues>({
  name,
  error,
  control,
  autoFocus,
  autoComplete,
  disabled,
  dataTestId = "email-input-field",
  type = "email",
  placeholder = "Email",
  label = "Email",
}: Props<T>): JSX.Element => (
  <FormTextInputField
    name={name}
    control={control}
    autoComplete={autoComplete}
    error={!!error}
    helperText={error}
    label={label}
    dataTestId={dataTestId}
    placeHolder={placeholder}
    type={type}
    disabled={disabled}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <MailIcon color="secondary" />
        </InputAdornment>
      ),
    }}
    autoFocus={autoFocus}
  />
);

export default EmailInputField;
