import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { OutlinedInputProps, TextField } from "@material-ui/core";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error: boolean;
  helperText: React.ReactNode;
  label: string;
  dataTestId?: string;
  autoComplete?: string;
  InputProps?: Partial<OutlinedInputProps>;
  autoFocus?: boolean;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  multiline?: boolean;
  disabled?: boolean;
}

const FormTextInputField = <T extends FieldValues>({
  name,
  control,
  error,
  helperText,
  label,
  dataTestId,
  autoComplete = undefined,
  InputProps = undefined,
  autoFocus = false,
  required = true,
  multiline = false,
  disabled = false,
  type = "text",
  placeHolder = undefined,
}: Props<T>): JSX.Element => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        autoComplete={autoComplete}
        label={label}
        margin="normal"
        placeholder={placeHolder}
        type={type}
        variant="outlined"
        color="secondary"
        error={error}
        helperText={helperText}
        InputProps={{
          ...InputProps,
          inputProps: {
            "data-testid": dataTestId,
          },
        }}
        autoFocus={autoFocus}
        required={required}
        multiline={multiline}
        disabled={disabled}
        fullWidth
      />
    )}
  />
);

export default FormTextInputField;
