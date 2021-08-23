import React from "react";

import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { CheckCircle, ErrorOutline } from "@material-ui/icons";

interface Props {
  title: string;
  content?: string;
  warning?: boolean;
  progress?: boolean;
  withIcon?: boolean;
}

const WaitingView: React.FC<Props> = ({
  title,
  content,
  warning,
  progress,
  withIcon,
  children,
}) => {
  let icon = null;

  if (withIcon) {
    icon = warning ? (
      <ErrorOutline data-testid="triangleIcon" />
    ) : (
      <CheckCircle data-testid="circleIcon" />
    );
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mt={1} position="relative">
          {icon}
          {progress && <CircularProgress />}
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        {content && (
          <Typography variant="body1" align="center">
            {content}
          </Typography>
        )}
        {children}
      </Box>
    </Container>
  );
};

export default WaitingView;
