import React, { useCallback, useState } from "react";

import { useTranslation } from "react-i18next";

import LanguageIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Box, Button, Menu, MenuItem, Typography } from "@material-ui/core";

import languages from "@consts/languages";

import useStyles from "./styles";

const ChangeLanguageSection: React.FC = () => {
  const styles = useStyles();

  const { t, i18n } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box pt={2} pb={1}>
      <Typography variant="h5">{t("Language")}</Typography>
      <Button data-testid="change-language-button" onClick={handleMenuOpen}>
        <LanguageIcon />
        <Box mx={1}>
          {languages.filter((l) => l.key === i18n.language)[0].label}
        </Box>{" "}
        <ExpandMoreIcon fontSize="small" />
      </Button>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        PopoverClasses={{ paper: styles.popover }}>
        {languages.map((l) => (
          <MenuItem
            key={l.key}
            data-testid={`change-language-to-${l.key}-button`}
            onClick={async () => {
              await i18n.changeLanguage(l.key);
              handleMenuClose();
            }}>
            {l.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChangeLanguageSection;
