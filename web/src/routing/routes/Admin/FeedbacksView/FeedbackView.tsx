import React from "react";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Feedback } from "@generated/types";

export interface Props {
  feedbacks: Feedback[];
  loading: boolean;
}

const FeedbackView: React.FC<Props> = ({ feedbacks, loading }) => {
  const { t } = useTranslation(["feedback", "field"]);

  return (
    <>
      <Typography variant="h2">{t("Feedbacks")}</Typography>
      <TableContainer component={Paper}>
        <Table data-testid="feedback-table" aria-label="Feedback">
          <TableHead data-testid="feedback-table-head">
            <TableRow>
              <TableCell align="left">{t("User ID")}</TableCell>
              <TableCell align="left">{t("Time")}</TableCell>
              <TableCell>{t("field:Description")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="feedback-table-body">
            {feedbacks.map((feedback) => (
              <TableRow
                data-testid="feedback-table-body-row"
                key={`${feedback.SK}`}>
                <TableCell align="left">{feedback.username}</TableCell>
                <TableCell align="left">{feedback.time}</TableCell>
                <TableCell component="th" scope="row">
                  {feedback.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <LinearProgress hidden={!loading} />
      </TableContainer>
    </>
  );
};

export default FeedbackView;
