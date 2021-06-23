import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NonPrivateRoute from "./NonPrivateRoute";

describe("<NonPrivateRoute />", () => {
  it("should render its content", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <NonPrivateRoute path="/test">
          <span>Non private route</span>
        </NonPrivateRoute>
      </MemoryRouter>
    );
    const title = screen.getByText(/Non private route/i);
    expect(title).toBeInTheDocument();
  });
});
