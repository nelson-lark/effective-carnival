import React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

import useUserContext from "@features/User/useUserContext";

import Paths from "@routing/paths";

const NonPrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useUserContext();

  if (user) return <Redirect to={Paths.BASE_LOGGED_IN} />;

  return <Route {...props} />;
};

export default NonPrivateRoute;
