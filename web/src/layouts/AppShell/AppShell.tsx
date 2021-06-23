import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";

import NavigationDrawer from "@layouts/NavigationDrawer";
import Paths from "@routing/paths";
import SendFeedback from "@components/SendFeedback";
import TopAppBar from "@layouts/TopAppBar";

const AppShell: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const toggleFeedback = () => {
    setFeedbackOpen((prevState) => !prevState);
  };

  const noAppShell = useRouteMatch([
    Paths.CONFIRM_RESET_PASSWORD_PATH,
    Paths.CONFIRM_SIGNUP_PATH,
    Paths.CREATE_NEW_PASSWORD_PATH,
    Paths.FORGOT_PASSWORD_PATH,
    Paths.SIGN_IN_PATH,
    Paths.SIGN_OUT_PATH,
    Paths.SIGN_UP_PATH,
    Paths.VERIFY_EMAIL_PATH,
  ]);
  if (noAppShell) return <>{children}</>;

  return (
    <>
      <TopAppBar
        onMenuButtonClick={handleDrawerOpen}
        onSendFeedbackClick={toggleFeedback}
      />
      <NavigationDrawer
        open={drawerOpen}
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
        onSendFeedbackClick={toggleFeedback}
      />
      <SendFeedback open={feedbackOpen} onClose={toggleFeedback} />
      {children}
    </>
  );
};

export default AppShell;
