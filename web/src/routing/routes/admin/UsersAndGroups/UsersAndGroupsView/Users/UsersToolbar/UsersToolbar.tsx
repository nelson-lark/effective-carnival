import React from "react";
import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const BoldText = withStyles({
  root: {
    fontWeight: "bold",
  },
})(Typography);

interface Props {
  numberOfResults: number;
  numberOfSelected?: number;
  totalNumber?: number | null;
}

const UsersToolbar: React.FC<Props> = ({
  numberOfResults,
  numberOfSelected,
  totalNumber,
}) => {
  const { t } = useTranslation("common");
  return (
    <Box display="flex" justifyContent="space-between" py={3} px={2}>
      <Grid item />
      <Grid item>
        <BoldText>
          {t("Showing results of", {
            count: numberOfResults,
            total: totalNumber,
          })}
          {!!numberOfSelected && (
            <>
              {" "}
              {t("selected", {
                count: numberOfSelected,
              })}
            </>
          )}
        </BoldText>
      </Grid>
    </Box>
  );
};

export default UsersToolbar;
