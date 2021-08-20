import React, { ChangeEvent, useMemo } from "react";

import clsx from "clsx";
import dayjs from "dayjs";

import {
  Box,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  Checkbox,
  TableCell,
  CircularProgress,
} from "@material-ui/core";

import { Waypoint } from "react-waypoint";

import { useTranslation } from "react-i18next";

import UsersToolbar from "./UsersToolbar";
import SearchToolbar from "./SearchToolbar";
import { GetUsersQuery } from "../../graphql/queries.generated";
import { SearchAttr, defaultLimit } from "../utils";
import useStyles from "./styles";

interface Props {
  data: GetUsersQuery | undefined;
  selected: Record<string, boolean>;
  searchAttr: SearchAttr;
  searchValue: string;
  onSearch(): void;
  onGetNext(): void;
  onCheckboxChange(e: ChangeEvent<HTMLInputElement>, id: string): void;
  onSearchValueChange(value: string): void;
  onSearchAttrChange(value: SearchAttr): void;
}

const Users: React.FC<Props> = ({
  data,
  selected,
  searchAttr,
  searchValue,
  onSearch,
  onGetNext,
  onCheckboxChange,
  onSearchValueChange,
  onSearchAttrChange,
}) => {
  const styles = useStyles();

  const { t } = useTranslation(["field", "common"]);

  const numberOfSelected = useMemo(
    () => Object.values(selected).filter((v) => v).length,
    [selected]
  );

  const infinitScrollFetchOffset = Math.floor(defaultLimit / 2);

  if (!data?.users.items)
    return (
      <Paper>
        <Box py={4} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={50} color="secondary" />
        </Box>
      </Paper>
    );

  return (
    <Grid container direction="column" component={Paper}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <SearchToolbar
          searchAttr={searchAttr}
          searchValue={searchValue}
          onSearch={onSearch}
          onSearchValueChange={onSearchValueChange}
          onSearchAttrChange={onSearchAttrChange}
        />
        <UsersToolbar
          numberOfSelected={numberOfSelected}
          numberOfResults={data.users.items.length}
          totalNumber={data.users.estimatedNumberOfUsers}
        />
      </Grid>

      <Grid item container>
        <TableContainer className={styles.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={styles.tRow}>
                <TableCell />
                <TableCell>{t("ID")}</TableCell>
                <TableCell>{t("Email")}</TableCell>
                <TableCell>{t("Phone number")}</TableCell>
                <TableCell>{t("Enabled")}</TableCell>
                <TableCell>{t("Status")}</TableCell>
                <TableCell>{t("Last Modified")}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.users.items.map((user, index, users) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected[user.id] ?? false}
                      onChange={(e) => onCheckboxChange(e, user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell
                    className={clsx({
                      [styles.positive]: user.enabled,
                      [styles.negative]: !user.enabled,
                    })}>
                    {t(`common:${user.enabled ? "Enabled" : "Disabled"}`)}
                  </TableCell>
                  <TableCell
                    className={clsx({
                      [styles.positive]: user.verified,
                      [styles.negative]: !user.verified,
                    })}>
                    {t(`common:${user.verified ? "Confirmed" : "Unconfirmed"}`)}
                  </TableCell>
                  <TableCell>
                    {dayjs(user.updatedAt).format("DD-MM-YYYY")}
                    {index === users.length - infinitScrollFetchOffset && (
                      <Waypoint onEnter={onGetNext} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Users;
