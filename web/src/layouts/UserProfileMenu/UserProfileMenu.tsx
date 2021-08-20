import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpIcon from "@material-ui/icons/Help";
import InputIcon from "@material-ui/icons/Input";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Paths from "@routing/paths";
import useUserContext from "@features/User/useUserContext";
import useStyles from "./styles";

export interface Props {
  onSendFeedbackClick: () => void;
}

const UserProfileMenu: React.FC<Props> = ({ onSendFeedbackClick }) => {
  const { t } = useTranslation(["common", "auth"]);
  const { user } = useUserContext();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSendFeedbackClick = () => {
    handleMenuClose();
    onSendFeedbackClick?.();
  };

  return (
    <>
      <IconButton
        aria-controls="settings-menu"
        aria-haspopup="true"
        data-testid="user-avatar-button"
        onClick={handleMenuOpen}
        className={classes.avatarButton}>
        <Avatar alt={user?.email} className={classes.avatar} />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        <Box display="flex" p={1}>
          <Avatar alt={user?.email} />
          <Box ml={1}>
            <Box data-testid="user-email-in-user-menu">{user?.email}</Box>
            <Link
              component={NavLink}
              to={Paths.SETTINGS_PATH}
              color="secondary"
              underline="none">
              {t("auth:Manage your Account")}
            </Link>
          </Box>
        </Box>
        <Divider />
        <MenuItem
          onClick={handleMenuClose}
          component={NavLink}
          to={Paths.SIGN_OUT_PATH}
          data-testid="sign-out-user-menu-item">
          <ListItemIcon>
            <InputIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("auth:Sign out")} />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleMenuClose}
          component={NavLink}
          to={Paths.SETTINGS_PATH}
          data-testid="settings-user-menu-item">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("Settings")} />
        </MenuItem>
        <MenuItem
          onClick={handleSendFeedbackClick}
          data-testid="send-feedback-user-menu-item">
          <ListItemIcon>
            <FeedbackIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("Send feedback")} />
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          component={NavLink}
          to={Paths.HELP_PATH}
          data-testid="help-user-menu-item">
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("Help")} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
