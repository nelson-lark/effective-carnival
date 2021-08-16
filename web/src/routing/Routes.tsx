import React, { lazy, useEffect } from "react";

import { Route, Switch, useLocation } from "react-router-dom";

import AnalyticsEventName from "@enums/AnalyticsEventName";

import { recordEvent } from "@utils/analytics";

import AdminRoute from "./AdminRoute";
import NonPrivateRoute from "./NonPrivateRoute";
import PrivateRoute from "./PrivateRoute";

import Paths from "./paths";

const Admin = lazy(() => import("./routes/Admin"));
const ConfirmReset = lazy(() => import("./routes/ConfirmReset"));
const ConfirmSignUp = lazy(() => import("./routes/ConfirmSignUp"));
const CreateNewPassword = lazy(() => import("./routes/CreateNewPassword"));
const Error = lazy(() => import("./routes/Error"));
const ForgotPassword = lazy(() => import("./routes/ForgotPassword"));
const Help = lazy(() => import("./routes/Help"));
const Index = lazy(() => import("./routes/Index"));
const Settings = lazy(() => import("./routes/Settings"));
const SignIn = lazy(() => import("./routes/SignIn"));
const SignUp = lazy(() => import("./routes/SignUp"));
const SignOut = lazy(() => import("./routes/SignOut"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail"));

const Routes: React.FC = () => {
  const { search, pathname, state } = useLocation();

  useEffect(() => {
    recordEvent({
      name: AnalyticsEventName.PageView,
      page: pathname,
    });
  }, [search, pathname, state]);

  return (
    <Switch>
      {/* START UNAUTHORIZED */}
      <Route
        path={Paths.CONFIRM_RESET_PASSWORD_PATH}
        component={ConfirmReset}
      />
      <Route path={Paths.CONFIRM_SIGNUP_PATH} component={ConfirmSignUp} />
      <NonPrivateRoute
        path={Paths.CREATE_NEW_PASSWORD_PATH}
        component={CreateNewPassword}
      />
      <NonPrivateRoute
        path={Paths.FORGOT_PASSWORD_PATH}
        component={ForgotPassword}
      />
      <NonPrivateRoute path={Paths.SIGN_IN_PATH} component={SignIn} />
      <NonPrivateRoute path={Paths.SIGN_UP_PATH} component={SignUp} />
      <NonPrivateRoute path={Paths.VERIFY_EMAIL_PATH} component={VerifyEmail} />
      {/* END UNAUTHORIZED */}

      {/* START AUTHORIZED-COMMON */}
      <PrivateRoute path={Paths.SIGN_OUT_PATH} component={SignOut} />
      {/* END AUTHORIZED-COMMON */}

      {/* START ADMIN */}
      <AdminRoute path={Paths.ADMIN_PATH} component={Admin} />
      {/* END ADMIN */}

      {/* START HELP/SETTINGS */}
      <Route path={Paths.SETTINGS_PATH} component={Settings} />
      <Route path={Paths.HELP_PATH} component={Help} />
      {/* END AUTHORIZED-COMMON */}

      {/* START COMMON */}
      <Route path={Paths.ERROR_PATH} component={Error} />
      <Route path="/" component={Index} />
      {/* END COMMON */}
    </Switch>
  );
};

export default Routes;
