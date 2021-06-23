import React from "react";
import { Auth } from "aws-amplify";
import { render } from "@testing-library/react";

import SignOut from "./SignOut";

describe("<SignOut />", () => {
  it("calls Auth.signOut() method", () => {
    Auth.signOut = jest.fn();

    render(<SignOut />);

    expect(Auth.signOut).toBeCalled();
  });
});
