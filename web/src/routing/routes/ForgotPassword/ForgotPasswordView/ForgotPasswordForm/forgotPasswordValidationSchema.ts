import { object, SchemaOf, string } from "yup";

import i18n from "@i18n/instance";

import ForgotPasswordState from "./ForgotPasswordState";

export default (): SchemaOf<ForgotPasswordState> =>
  <SchemaOf<ForgotPasswordState>>object({
    email: string()
      .required(i18n.t("validation:is a required field", { field: "Email" }))
      .email(
        i18n.t("validation:invalid", {
          field: i18n.t("field:Email address").toLowerCase(),
        })
      ),
  });
