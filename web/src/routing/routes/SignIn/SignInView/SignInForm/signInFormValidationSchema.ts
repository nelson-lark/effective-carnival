import { object, SchemaOf, string } from "yup";

import i18n from "@i18n/instance";

import { MAX_STRING_LENGTH } from "@consts/index";
import validateMaxStringLength from "@utils/validation/validateMaxStringLength";

import SignInFormState from "./SignInFormState";

export default (): SchemaOf<SignInFormState> =>
  <SchemaOf<SignInFormState>>object({
    email: string()
      .required(i18n.t("validation:is a required field", { field: "Email" }))
      .email(
        i18n.t("validation:invalid", {
          field: i18n.t("field:Email address").toLowerCase(),
        })
      )
      .test(
        "Maximum email length",
        i18n.t("validation:is too long", {
          field: "Email",
          length: MAX_STRING_LENGTH,
        }),
        validateMaxStringLength
      ),
    password: string()
      .required(
        i18n.t("validation:is a required field", {
          field: i18n.t("field:Password"),
        })
      )
      .test(
        "Maximum password length",
        i18n.t("validation:is too long", {
          field: i18n.t("field:Your password"),
          length: MAX_STRING_LENGTH,
        }),
        validateMaxStringLength
      ),
  });
