import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@material-ui/core";

import useStyle from "./styles";

interface Props {
  password: string;
  visible?: boolean;
  validation: string[];
}

const textVariants = ["Weak", "Weak", "Medium", "Strong"];

const PasswordMeter: React.FC<Props> = ({ password, visible, validation }) => {
  const { t } = useTranslation("auth");
  const classes = useStyle();
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(
      validation.reduce(
        (acc, regex) => acc + +new RegExp(regex).test(password),
        0
      )
    );
  }, [strength, validation, password]);

  const gridElements = new Array(3).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Grid key={i} xs item className={`${classes.box}`} />
  ));

  const infoText = (): React.ReactElement => {
    return (
      <Typography className={classes.text}>
        <Typography component="span" className={classes.boldText}>
          {t(`${textVariants[strength - 1]} password`)}{" "}
        </Typography>
        <Typography component="span">
          - {t("Your password must be")}.
        </Typography>
      </Typography>
    );
  };

  return visible && password ? (
    <Box mt={0.25} px={1.75} boxSizing="border-box">
      <Grid className={classes.boxes} container>
        {gridElements}
      </Grid>
      {infoText()}
    </Box>
  ) : null;
};

export default PasswordMeter;
