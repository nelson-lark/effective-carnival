import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import { Analytics, Auth } from "aws-amplify";

import defaultTheme from "@themes/defaultTheme";

import ForgotPassword from "./ForgotPassword";

describe("<ForgotPassword />", () => {
  beforeAll(() => {
    Analytics.record = jest.fn();
  });

  it.skip("should render forgot password page", () => {
    render(
      <ThemeProvider theme={defaultTheme()}>
        <ForgotPassword />
      </ThemeProvider>
    );

    const title = screen.getByText(/Forgot your password/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      /Please write email you used during create account process/i
    );
    expect(description).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    const resetPasswordButton = screen.getByText(/Reset password/i);
    expect(resetPasswordButton).toBeInTheDocument();

    const backToSignUpButton = screen.getByText(/Back to sign in page/i);
    expect(backToSignUpButton).toBeInTheDocument();
  });

  it("should render forgot password page with disabled button", async () => {
    Auth.forgotPassword = jest.fn();

    render(
      <ThemeProvider theme={defaultTheme()}>
        <ForgotPassword />
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const resetPasswordButton = screen.getByText(/Reset password/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.click(resetPasswordButton);
    });

    const button = screen.getByText(/Reset password/i).closest("button");

    expect(button).toBeDisabled();
  });
});
