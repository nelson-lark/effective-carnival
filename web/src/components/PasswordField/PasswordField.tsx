import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Theme,
  Tooltip,
  useTheme,
} from "@material-ui/core";

import { Control, FieldValues, Path } from "react-hook-form";

import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import FormTextInputField from "@components/FormTextInputField";

interface Props<T extends FieldValues> {
  id: string;
  name: Path<T>;
  control: Control<T>;
  error: string | undefined;
  label: string;
  dataTestId?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  withIcon?: boolean;
  labelWidth?: number;
}

const PasswordField = <T extends FieldValues>({
  id,
  name,
  error,
  label,
  control,
  dataTestId = "password-input-field",
  placeholder,
  autoComplete,
  autoFocus,
  withIcon = true,
  labelWidth = 70,
}: Props<T>): JSX.Element => {
  const theme = useTheme<Theme>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const visibilityButtonLabel = (passwordShown: boolean): string =>
    passwordShown ? "Hide password" : "Show password";

  return (
    <FormTextInputField
      name={name}
      control={control}
      error={!!error}
      helperText={error}
      label={label}
      dataTestId={dataTestId}
      placeHolder={placeholder}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: withIcon && (
          <InputAdornment position="end">
            <Tooltip title={visibilityButtonLabel(showPassword)}>
              <IconButton
                aria-controls={id}
                aria-expanded={showPassword}
                aria-label={visibilityButtonLabel(showPassword)}
                onClick={handleClickShowPassword}
                data-testid="show-password-button"
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? (
                  <VisibilityOffIcon htmlColor={theme.palette.primary.dark} />
                ) : (
                  <VisibilityIcon htmlColor={theme.palette.primary.light} />
                )}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon color="primary" />
          </InputAdornment>
        ),
        labelWidth,
      }}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  );
};

export default PasswordField;
