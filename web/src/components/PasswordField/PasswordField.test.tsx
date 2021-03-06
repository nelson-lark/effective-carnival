import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import { fireEvent, render } from "@testing-library/react";
import { useForm } from "react-hook-form";

import defaultTheme from "@themes/defaultTheme";

import PasswordField from "./PasswordField";

const setup = () => {
  const FormWrapper: React.FC = () => {
    const {
      control,
      formState: { errors },
    } = useForm<{ password: string }>({
      mode: "all",
      defaultValues: { password: "" },
    });

    return (
      <ThemeProvider theme={defaultTheme()}>
        <PasswordField
          id="password"
          name="password"
          label="password"
          placeholder="password"
          control={control}
          error={errors.password?.message}
        />
      </ThemeProvider>
    );
  };

  return render(<FormWrapper />);
};

describe("<PasswordField />", () => {
  it("should render with type set to password", () => {
    const utils = setup();
    const passwordInput = utils.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    expect(passwordInput.type).toEqual("password");
  });

  it("should change its type to text on visibility button click", () => {
    const utils = setup();

    const visibilityButton = utils.getByLabelText("Show password");
    fireEvent.click(visibilityButton);

    const passwordInput = utils.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    expect(passwordInput.type).toEqual("text");
  });

  it("should change aria-label on visibility button click", () => {
    const utils = setup();

    const visibilityButton = utils.getByLabelText("Show password");
    fireEvent.click(visibilityButton);
    const ariaLabel = visibilityButton.getAttribute("aria-label");

    expect(ariaLabel).toEqual("Hide password");
  });
});
