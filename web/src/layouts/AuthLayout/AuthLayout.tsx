import React from "react";

import { Box, Container, ContainerProps } from "@material-ui/core";
import useStyles from "./styles";

interface Props {
  maxWidth?: ContainerProps["maxWidth"];
}

const AuthLayout: React.FC<Props> = ({ maxWidth = "md", children }) => {
  const styles = useStyles();
  return (
    <Container maxWidth={maxWidth} className={styles.container} disableGutters>
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center">
        <Box height="fit-content">{children}</Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
