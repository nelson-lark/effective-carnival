import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import Paths from "@routing/paths";
import useUserContext from "@features/User/useUserContext";

type PrivateRouteProps = RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...props }) => {
  const { user } = useUserContext();

  if (user === null) return <Redirect to={Paths.SIGN_IN_PATH} />;

  if (user) return <Route {...props} />;

  return null;
};

export default PrivateRoute;
