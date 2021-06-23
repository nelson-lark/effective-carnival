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
}

const WaitingView: React.FC<Props> = ({
  title,
  content,
  warning,
  progress,
}) => (
  <Container maxWidth="xs">
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={1} position="relative">
        {warning ? (
          <ErrorOutline data-testid="triangleIcon" />
        ) : (
          <CheckCircle data-testid="circleIcon" />
        )}
        {progress && <CircularProgress />}
      </Box>
      <Typography variant="h3" align="center" gutterBottom>
        {title}
      </Typography>
      {content && (
        <Typography variant="body1" align="center">
          {content}
        </Typography>
      )}
    </Box>
  </Container>
);

export default WaitingView;
