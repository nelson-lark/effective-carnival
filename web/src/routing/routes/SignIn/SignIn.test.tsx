import React from "react";
import { Analytics, Auth } from "aws-amplify";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";
import defaultTheme from "@themes/defaultTheme";

import SignIn from "./SignIn";

describe("<SignIn />", () => {
  it("should call Auth.signIn() function on form submit", async () => {
    Auth.signIn = jest.fn();
    Analytics.record = jest.fn();

    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = await screen.findByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = await screen.findByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const signInElements = await screen.findAllByText(/Sign in/i);
    expect(signInElements).toHaveLength(2);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.click(signInElements[1]);
    });

    expect(Auth.signIn).toBeCalled();
  });

  it("should handle error form Auth.signIn()", async () => {
    Auth.signIn = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    Analytics.record = jest.fn();

    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = await screen.findByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = await screen.findByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const signInElements = await screen.findAllByText(/Sign in/i);
    expect(signInElements).toHaveLength(2);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.click(signInElements[1]);
    });

    expect(Analytics.record).toBeCalledWith({
      name: AnalyticsEventName.SignIn,
      attributes: {
        result: AnalyticsEventResult.Failure,
      },
    });
  });
});
