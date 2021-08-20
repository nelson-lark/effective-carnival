import React, { ChangeEvent } from "react";

import {
  Grid,
  Select,
  MenuItem,
  IconButton,
  TextField,
} from "@material-ui/core";

import { useTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { SearchAttr, SelectValue } from "../../utils";

const selectAttrOptions = [
  {
    label: "Email",
    value: SearchAttr.Email,
  },
  {
    label: "Enabled",
    value: SearchAttr.Enabled,
  },
  {
    label: "Confirmed",
    value: SearchAttr.Confirmed,
  },
];

const selectValueOptions = [
  {
    label: "All",
    value: SelectValue.All,
  },
  {
    label: "Enabled",
    value: SelectValue.Enabled,
  },
  {
    label: "Disabled",
    value: SelectValue.Disabled,
  },
];

interface Props {
  searchAttr: SearchAttr;
  searchValue: string;
  onSearch(): void;
  onSearchValueChange(value: string): void;
  onSearchAttrChange(value: SearchAttr): void;
}

const Users: React.FC<Props> = ({
  searchAttr,
  searchValue,
  onSearch,
  onSearchValueChange,
  onSearchAttrChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["common", "field"]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    onSearchValueChange(event.target.value);

  const handleSelectAttrChange = (event: ChangeEvent<{ value: unknown }>) => {
    const newSearchAttr = event.target.value as SearchAttr;
    onSearchAttrChange(newSearchAttr);
    onSearchValueChange(
      newSearchAttr !== SearchAttr.Email ? SelectValue.All : ""
    );
  };

  const handleSelectValueChange = (event: ChangeEvent<{ value: unknown }>) => {
    onSearchValueChange(event.target.value as string);
  };

  const handleSearchClick = () => onSearch();

  return (
    <Grid item xs={6} className={classes.searchToolbar}>
      <Select
        data-testid="search-attr-select"
        name="search-attr"
        className={classes.select}
        value={searchAttr}
        onChange={handleSelectAttrChange}>
        {selectAttrOptions.map(({ label, value }) => (
          <MenuItem
            data-testid={`search-attr-${value}`}
            key={value}
            value={value}>
            {t(label)}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.valueWrapper}>
        {searchAttr === SearchAttr.Email ? (
          <TextField
            data-testid="search-value-input"
            name="search-value"
            placeholder={t("Search for value")}
            onChange={handleInputChange}
            value={searchValue}
            className={classes.input}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton
                  data-testid="search-button"
                  onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        ) : (
          <Select
            className={classes.valueSelect}
            data-testid="search-value-select"
            name="search-value"
            value={searchValue}
            onChange={handleSelectValueChange}
            fullWidth>
            {selectValueOptions.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {t(label)}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
    </Grid>
  );
};

export default Users;
