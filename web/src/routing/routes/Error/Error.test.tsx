import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import defaultTheme from "@themes/defaultTheme";

import Error from "./Error";

const setup = (title?: string) =>
  render(
    <ThemeProvider theme={defaultTheme()}>
      <MemoryRouter>
        <Route
          path="/"
          component={Error}
          location={{
            pathname: "/",
            search: "",
            state: { title, description: "Test description" },
            hash: "",
            key: "",
          }}
        />
      </MemoryRouter>
    </ThemeProvider>
  );

describe("<Error />", () => {
  it("should render title provided in location.state", () => {
    setup("Test title");

    const title = screen.getByText("Test title");
    expect(title).toBeInTheDocument();

    const description = screen.getByText("Test description");
    expect(description).toBeInTheDocument();
  });

  it("should render default title", () => {
    setup();

    const title = screen.getByText("Upps, something went wrong");
    expect(title).toBeInTheDocument();
  });
});
