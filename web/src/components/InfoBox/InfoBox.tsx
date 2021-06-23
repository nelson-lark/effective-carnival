import React from "react";

import { Box, Typography } from "@material-ui/core";

interface Props {
  text: string;
}

const InfoBox: React.FC<Props> = ({ text }: Props) => (
  <Box m={2} px={1.2} pt={1.1} pb={2} textAlign="center">
    <Typography>{text}</Typography>
  </Box>
);

export default InfoBox;
