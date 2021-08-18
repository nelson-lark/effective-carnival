import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Auth } from "aws-amplify";

import defaultTheme from "@themes/defaultTheme";

import CreateNewPassword from "../CreateNewPassword";

describe("<CreateNewPassword />", () => {
  it("should render title and sign in button", () => {
    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <Route
            path="/"
            component={CreateNewPassword}
            location={{
              key: "",
              pathname: "/",
              search: "?code=111111&username=test@test.com",
              state: {},
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
    const title = screen.getByText(/Create new password/i);
    expect(title).toBeInTheDocument();
    const description = screen.getByText(/Your password must be/i);
    expect(description).toBeInTheDocument();
    const saveButton = screen.getByText(/Save/i);
    expect(saveButton).toBeInTheDocument();
    const cancelButton = screen.getByText(/Cancel/i);
    expect(cancelButton).toBeInTheDocument();
    const image = document.getElementsByTagName("svg");
    expect(image).toHaveLength(4);
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    expect(passwordInputs).toHaveLength(2);
  });

  it("should call Auth.forgotPasswordSubmit() on form submit", async () => {
    Auth.forgotPasswordSubmit = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <Route
            path="/"
            component={CreateNewPassword}
            location={{
              key: "",
              pathname: "/",
              search: "?code=111111&username=test@test.com",
              state: {},
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const saveButton = screen.getByText(/Save/i);

    await act(async () => {
      passwordInputs.forEach((field) => {
        fireEvent.change(field, {
          target: { value: "Test12345@" },
        });
      });

      fireEvent.click(saveButton);
    });

    expect(Auth.forgotPasswordSubmit).toBeCalled();
  });
});
