import React from "react";

import { Box, BoxProps, Container, ContainerProps } from "@material-ui/core";

interface Props extends BoxProps {
  maxWidth?: ContainerProps["maxWidth"];
}

const AuthLayout: React.FC<Props> = ({ maxWidth = "md", ...props }) => {
  return (
    <Container maxWidth={maxWidth} disableGutters>
      <Box {...props} />
    </Container>
  );
};

export default AuthLayout;
