import React from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

import environment from "@consts/environment";
import useThemeContext from "@features/Theme/useThemeContext";
import { useTranslation } from "react-i18next";

const ChangeDirectionSection: React.FC = () => {
  const { t } = useTranslation("common");

  const { direction, toggleDirection } = useThemeContext();

  if (!environment.development) {
    return null;
  }

  return (
    <Box pt={2} pb={1}>
      <FormControl>
        <Typography variant="h5">{t("Direction")}</Typography>
        <RadioGroup
          aria-label="direction"
          name="gender1"
          value={direction}
          onChange={toggleDirection}>
          <FormControlLabel
            value="ltr"
            control={
              <Radio
                inputProps={{ "data-testid": "ltr-radio-button" } as never}
              />
            }
            label={t("Left to right")}
          />
          <FormControlLabel
            value="rtl"
            control={
              <Radio
                inputProps={{ "data-testid": "rtl-radio-button" } as never}
              />
            }
            label={t("Right to left")}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ChangeDirectionSection;
