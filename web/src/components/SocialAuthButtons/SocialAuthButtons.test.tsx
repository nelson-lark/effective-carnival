import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";

import defaultTheme from "@themes/defaultTheme";
import SocialPlatform from "@enums/SocialPlatform";

import SocialAuthButtons from "./SocialAuthButtons";

describe("<SocialAuthButtons />", () => {
  it("should call onSocialClick handler with a proper platform passed on social button click", () => {
    const onSocialClick = jest.fn(() => {});

    render(
      <ThemeProvider theme={defaultTheme()}>
        <SocialAuthButtons onSocialClick={onSocialClick} />
      </ThemeProvider>
    );

    const appleButton = screen.getByLabelText(/Sign up with Apple/i);
    expect(appleButton).toBeInTheDocument();
    fireEvent.click(appleButton);
    expect(onSocialClick).toBeCalledWith(SocialPlatform.Apple);

    const facebookButton = screen.getByLabelText(/Sign up with Facebook/i);
    expect(facebookButton).toBeInTheDocument();
    fireEvent.click(facebookButton);
    expect(onSocialClick).toBeCalledWith(SocialPlatform.Facebook);

    const googleButton = screen.getByLabelText(/Sign up with Google/i);
    expect(googleButton).toBeInTheDocument();
    fireEvent.click(googleButton);
    expect(onSocialClick).toBeCalledWith(SocialPlatform.Google);
  });
});
