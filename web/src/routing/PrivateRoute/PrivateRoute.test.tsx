import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import { UserContext } from "@features/User/UserProvider";
import { LinearProgress } from "@material-ui/core";
import Paths from "../paths";
import PrivateRoute from "./PrivateRoute";

describe("<PrivateRoute />", () => {
  it("should render its content when the user is provided", () => {
    render(
      <UserContext.Provider
        value={{
          user: {
            email: "test@test.com",
            emailVerified: true,
            phoneNumber: "+48777888999",
            sub: "uuid",
          },
          updateUser: () => {},
        }}>
        <React.Suspense fallback={<LinearProgress />}>
          <MemoryRouter initialEntries={["/test"]}>
            <PrivateRoute path="/test">
              <span>Private route</span>
            </PrivateRoute>
          </MemoryRouter>
        </React.Suspense>
      </UserContext.Provider>
    );
    const title = screen.getByText(/Private route/i);
    expect(title).toBeInTheDocument();
  });

  it("should redirect to sign in page when the user is set to null", () => {
    render(
      <UserContext.Provider
        value={{
          user: null,
          updateUser: () => {},
        }}>
        <MemoryRouter initialEntries={["/test"]}>
          <PrivateRoute path="/test">
            <span>Private route</span>
          </PrivateRoute>
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
