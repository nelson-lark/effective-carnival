import React from "react";

import { LinearProgress } from "@material-ui/core";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { UserContext } from "@features/User/UserProvider";

import AdminRoute from "./AdminRoute";
import Paths from "../paths";
import PrivateRoute from "../PrivateRoute";

describe("<AdminRoute />", () => {
  it("should render its content when the user is provided and the user is admin", () => {
    render(
      <UserContext.Provider
        value={{
          isUserAdmin: () => true,
          user: {
            email: "test@test.com",
            emailVerified: true,
            phoneNumber: "+48777888999",
            sub: "uuid",
            groups: [],
          },
          updateUser: () => {},
        }}>
        <React.Suspense fallback={<LinearProgress />}>
          <MemoryRouter initialEntries={["/test"]}>
            <AdminRoute path="/test">
              <span>Admin route</span>
            </AdminRoute>
          </MemoryRouter>
        </React.Suspense>
      </UserContext.Provider>
    );
    const title = screen.getByText(/Admin route/i);
    expect(title).toBeInTheDocument();
  });

  it("should redirect to base page if the user is provided but is not admin", () => {
    render(
      <UserContext.Provider
        value={{
          isUserAdmin: () => false,
          user: {
            email: "test@test.com",
            emailVerified: true,
            phoneNumber: "+48777888999",
            sub: "uuid",
            groups: [],
          },
          updateUser: () => {},
        }}>
        <React.Suspense fallback={<LinearProgress />}>
          <MemoryRouter initialEntries={["/test"]}>
            <AdminRoute path="/test">
              <span>Admin route</span>
            </AdminRoute>
            <PrivateRoute path={Paths.BASE_LOGGED_IN}>
              <span>Base</span>
            </PrivateRoute>
          </MemoryRouter>
        </React.Suspense>
      </UserContext.Provider>
    );
    const title = screen.getByText(/Base/i);
    expect(title).toBeInTheDocument();
  });

  it("should redirect to sign in page when the user is set to null", () => {
    render(
      <UserContext.Provider
        value={{
          isUserAdmin: () => false,
          user: null,
          updateUser: () => {},
        }}>
        <MemoryRouter initialEntries={["/test"]}>
          <AdminRoute path="/test">
            <span>Admin route</span>
          </AdminRoute>
          <Route path={Paths.SIGN_IN_PATH}>
            <span>Sign in</span>
          </Route>
        </MemoryRouter>
      </UserContext.Provider>
    );
    const title = screen.getByText(/Sign in/i);
    expect(title).toBeInTheDocument();
  });
});
