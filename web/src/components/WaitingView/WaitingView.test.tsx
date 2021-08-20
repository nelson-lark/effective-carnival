import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import defaultTheme from "@themes/defaultTheme";
import WaitingView from "@components/WaitingView/WaitingView";

const setup = (warning?: boolean) =>
  render(
    <ThemeProvider theme={defaultTheme()}>
      <WaitingView title="test" warning={warning} withIcon />
    </ThemeProvider>
  );

describe("<WaitingView/>", () => {
  it("should render waiting view with triangle icon", () => {
    setup(true);
    expect(screen.getByTestId("triangleIcon")).toBeInTheDocument();
  });
  it("should render waiting view with circle icon", () => {
    setup(false);
    expect(screen.getByTestId("circleIcon")).toBeInTheDocument();
  });
});
