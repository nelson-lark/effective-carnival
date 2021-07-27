import React from "react";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Logo from "@layouts/Logo";
import Paths from "@routing/paths";
import UserProfileMenu from "@layouts/UserProfileMenu";
import useUserContext from "@features/User/useUserContext";

import useStyles from "./styles";

export interface Props {
  onMenuButtonClick(): void;
  onSendFeedbackClick(): void;
}

const TopAppBar: React.FC<Props> = ({
  onMenuButtonClick,
  onSendFeedbackClick,
}) => {
  const { t } = useTranslation("auth");

  const { user } = useUserContext();

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          data-testid="open-side-menu-button"
          onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Logo dataTestId="logo-link-in-top-app-bar" />

        {user ? (
          <UserProfileMenu onSendFeedbackClick={onSendFeedbackClick} />
        ) : (
          <Button
            data-testid="sign-in-button-on-app-bar"
            component={NavLink}
            to={Paths.SIGN_IN_PATH}
            color="inherit">
            {t("Sign in")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
