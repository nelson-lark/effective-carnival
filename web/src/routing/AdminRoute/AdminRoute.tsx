import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import Paths from "@routing/paths";
import useUserContext from "@features/User/useUserContext";

type AdminRouteProps = RouteProps;

const AdminRoute: React.FC<AdminRouteProps> = ({ ...props }) => {
  const { isUserAdmin, user } = useUserContext();

  if (user === null) return <Redirect to={Paths.SIGN_IN_PATH} />;

  if (!isUserAdmin()) return <Redirect to={Paths.BASE_LOGGED_IN} />;

  if (user) return <Route {...props} />;

  return null;
};

export default AdminRoute;
