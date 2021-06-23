import React from "react";

import { Box, BoxProps, Container } from "@material-ui/core";

interface Props extends BoxProps {
  withBottomPadding?: boolean;
  withTopPadding?: boolean;
  withTopGradient?: boolean;
}

const PageLayout: React.FC<Props> = ({
  className,
  withBottomPadding = false,
  withTopPadding = false,
  ...props
}) => {
  return (
    <Container maxWidth="md" disableGutters>
      <Box
        mt={4}
        pt={withTopPadding ? 6.5 : 0}
        pb={withBottomPadding ? 10 : 0}
        {...props}
      />
    </Container>
  );
};

export default PageLayout;
