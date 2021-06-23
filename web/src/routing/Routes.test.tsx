import React from "react";
import { Analytics } from "aws-amplify";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import defaultTheme from "@themes/defaultTheme";

import Routes from "./Routes";
import Paths from "./paths";

describe("<Routes />", () => {
  it("should render routes properly", async () => {
    Analytics.record = jest.fn();

    render(
      <ThemeProvider theme={defaultTheme()}>
        <MemoryRouter initialEntries={[Paths.BASE_LOGGED_IN]}>
          <React.Suspense fallback={<div>test</div>}>
            <Routes />
          </React.Suspense>
        </MemoryRouter>
      </ThemeProvider>
    );

    const indexContent = await screen.findByText("Index page");
    expect(indexContent).toBeInTheDocument();
  });
});
