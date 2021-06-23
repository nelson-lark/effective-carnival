import React from "react";
import { render, screen } from "@testing-library/react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import defaultTheme from "@themes/defaultTheme";

import PasswordMeter from "./PasswordMeter";

describe("<PasswordMeter />", () => {
  it("should render strength meter with weak password", () => {
    render(
      <ThemeProvider theme={defaultTheme()}>
        <PasswordMeter
          password="1234"
          visible
          validation={[
            "(?=.*[a-z])",
            "(?=.*[A-Z])",
            "(?=.*[0-9])",
            "(?=.{12,})",
          ]}
        />
      </ThemeProvider>
    );
    const passwordStrength = screen.getByText(/Weak password/i);
    expect(passwordStrength).toBeInTheDocument();
    const description = screen.getByText(/your password must be/i);
    expect(description).toBeInTheDocument();
  });

  it("should render strength meter with strong password", () => {
    render(
      <ThemeProvider theme={defaultTheme()}>
        <PasswordMeter
          password="Hello1233455@"
          visible
          validation={[
            "(?=.*[a-z])",
            "(?=.*[A-Z])",
            "(?=.*[0-9])",
            "(?=.{12,})",
          ]}
        />
      </ThemeProvider>
    );
    const passwordStrength = screen.getByText(/Strong password/i);
    expect(passwordStrength).toBeInTheDocument();
  });
});
