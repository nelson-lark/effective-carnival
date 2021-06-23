import React from "react";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Logo from "@layouts/Logo";
import Paths from "@routing/paths";
import useUserContext from "@features/User/useUserContext";

import useStyles from "./styles";

interface Props {
  open: boolean;
  onDrawerOpen(): void;
  onDrawerClose(): void;
  onSendFeedbackClick(): void;
}

const NavigationDrawer: React.FC<Props> = ({
  open,
  onDrawerOpen,
  onDrawerClose,
  onSendFeedbackClick,
}) => {
  const { t } = useTranslation("common");

  const { user } = useUserContext();
  const classes = useStyles();

  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={open}
      data-testid="side-menu-drawer-container"
      classes={{
        paper: classes.drawerPaper,
      }}
      onOpen={onDrawerOpen}
      onClose={onDrawerClose}>
      <Box
        role="presentation"
        onClick={onDrawerClose}
        onKeyDown={onDrawerClose}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%">
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                data-testid="close-side-menu-button"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={onDrawerClose}>
                <CloseIcon />
              </IconButton>
              <Logo />
            </Toolbar>
          </AppBar>
          <Divider />
          <List>
            {user?.groups.includes("admin") && (
              <>
                <ListItem
                  button
                  data-testid="admin-button-in-side-menu"
                  component={NavLink}
                  to={Paths.ADMIN_PATH}
                  exact
                  activeClassName={classes.active}>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("Admin")} />
                </ListItem>
                <Divider />
              </>
            )}
            <ListItem
              button
              data-testid="settings-button-in-side-menu"
              component={NavLink}
              to={Paths.SETTINGS_PATH}
              exact
              activeClassName={classes.active}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("Settings")} />
            </ListItem>
            {user && (
              <ListItem
                button
                data-testid="send-feedback-button-in-side-menu"
                onClick={onSendFeedbackClick}>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary={t("Send feedback")} />
              </ListItem>
            )}
            <ListItem
              button
              data-testid="help-button-in-side-menu"
              component={NavLink}
              to={Paths.HELP_PATH}
              exact
              activeClassName={classes.active}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={t("Help")} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
