import React from "react";
import { Auth, Analytics } from "aws-amplify";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import defaultTheme from "@themes/defaultTheme";

import VerifyEmail from "./VerifyEmail";

describe("<VerifyEmail />", () => {
  it("should render email if provided in location state", () => {
    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <Route
            path="/"
            component={VerifyEmail}
            location={{
              key: "tempKey",
              pathname: "/",
              search: "",
              state: { email: "test@test.com" },
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
    const element = screen.getByText("test@test.com");
    expect(element).toBeInTheDocument();
  });

  it("should call Auth.resendSignUp() on button click", async () => {
    jest.useFakeTimers();
    Analytics.record = jest.fn();
    Auth.resendSignUp = jest.fn();

    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <Route
            path="/"
            component={VerifyEmail}
            location={{
              key: "tempKey",
              pathname: "/",
              search: "",
              state: { email: "test@test.com" },
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
    const buttonText = screen.getByText("Resend email");
    expect(buttonText).toBeInTheDocument();

    await act(async () => {
      jest.runAllTimers();
      fireEvent.click(buttonText);
      // TODO test Auth.resendSignUp();
    });

    const button = buttonText.closest("button");
    expect(button).toBeDisabled();
  });
});
