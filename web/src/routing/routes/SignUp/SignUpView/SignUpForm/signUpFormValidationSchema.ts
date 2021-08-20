import { object, ref, SchemaOf, string } from "yup";

import i18n from "@i18n/instance";

import { MAX_STRING_LENGTH } from "@consts/index";

import { PHONE_REGEXP } from "@utils/validation/regexp";
import validateMaxStringLength from "@utils/validation/validateMaxStringLength";
import validatePhoneNumber from "@utils/validation/validatePhoneNumber";
import passwordValidation from "@utils/passwordValidation";

import SignUpFormState from "./SignUpFormState";

export default (): SchemaOf<SignUpFormState> =>
  <SchemaOf<SignUpFormState>>object({
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
    phone: string()
      .required(
        i18n.t("validation:is a required field", {
          field: i18n.t("field:Phone number"),
        })
      )
      .test(
        "Phone number format",
        i18n.t("validation:provide valid phone number"),
        validatePhoneNumber()
      )
      .matches(PHONE_REGEXP, i18n.t("validation:provide valid phone number"))
      .max(
        MAX_STRING_LENGTH,
        i18n.t("validation:is too long", {
          field: i18n.t("field:Phone number"),
          length: MAX_STRING_LENGTH,
        })
      ),
    password: passwordValidation(),
    confirmPassword: string()
      .required(
        i18n.t("validation:is a required field", {
          field: i18n.t("field:Confirm Password"),
        })
      )
      .oneOf(
        [ref("password"), null],
        i18n.t("validation:must be a match", {
          field: i18n.t("field:Confirm Password"),
        })
      ),
  });
