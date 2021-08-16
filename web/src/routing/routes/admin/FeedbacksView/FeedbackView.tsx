import React from "react";

import { format, parseISO } from "date-fns";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Feedback } from "@generated/types";

export interface Props {
  feedbacks: Feedback[];
  loading: boolean;
  onPageChange(page: number): void;
  onRowsPerPageChange(rowsPerPage: number): void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

const FeedbackView: React.FC<Props> = ({
  feedbacks,
  loading,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  totalCount,
}) => {
  const { t } = useTranslation(["feedback", "field"]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number
  ) => {
    onPageChange(pageNumber);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {t("Feedbacks")}
      </Typography>
      <TableContainer component={Paper}>
        <Table data-testid="feedback-table" aria-label="Feedback">
          <TableHead data-testid="feedback-table-head">
            <TableRow data-testid="feedback-table-head-row">
              <TableCell data-testid="user-id-head-cell" align="left">
                {t("User ID")}
              </TableCell>
              <TableCell data-testid="time-head-cell" align="left">
                {t("Time")}
              </TableCell>
              <TableCell
                data-testid="description-head-cell"
                align="left"
                width="50%">
                {t("field:Description")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="feedback-table-body">
            {feedbacks.map((feedback) => (
              <TableRow
                data-testid="feedback-table-body-row"
                key={`${feedback.SK}`}>
                <TableCell data-testid="user-id-body-cell" align="left">
                  {feedback.username}
                </TableCell>
                <TableCell data-testid="time-body-cell" align="left">
                  {format(parseISO(feedback.time), "yyyy-MM-dd, HH:m:s")}
                </TableCell>
                <TableCell
                  data-testid="description-body-cell"
                  component="th"
                  scope="row">
                  {feedback.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalCount}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <LinearProgress hidden={!loading} />
      </TableContainer>
    </>
  );
};

export default FeedbackView;
