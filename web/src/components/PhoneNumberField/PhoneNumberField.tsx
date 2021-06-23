import React, { useEffect } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form/dist/types/form";
import { useTranslation } from "react-i18next";

import { Box, TextField } from "@material-ui/core";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error: string | undefined;
  dataTestId?: string;
  required?: boolean;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
}

const PhoneNumberField = <T extends FieldValues>({
  name,
  error,
  dataTestId = "phone-number-input-field",
  control,
  required,
  setValue,
  getValues,
}: Props<T>): JSX.Element => {
  const { t } = useTranslation("field");

  useEffect(() => {
    const phoneNumber = getValues(name) ?? "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setValue(name, phoneNumber);
  }, [setValue, getValues, name]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input type="hidden" value={field.value as string} />
            <TextField
              autoComplete="tel"
              label={t("Mobile phone")}
              margin="normal"
              placeholder={t("Mobile phone")}
              type="text"
              variant="outlined"
              error={!!error}
              InputProps={{
                inputProps: {
                  "data-testid": dataTestId,
                },
              }}
              helperText={error}
              required={required}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              value={field.value}
              fullWidth
            />
          </>
        )}
      />
    </Box>
  );
};

export default PhoneNumberField;
