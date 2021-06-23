import { object, SchemaOf, string, ref } from "yup";

import passwordValidation from "@utils/passwordValidation";

import i18n from "@i18n/instance";

import CreateNewPasswordState from "./CreateNewPasswordState";

export default (): SchemaOf<CreateNewPasswordState> =>
  <SchemaOf<CreateNewPasswordState>>object({
    password: passwordValidation(),
    retypePassword: string()
      .required(i18n.t("validation:is a required field", { field: "Password" }))
      .oneOf(
        [ref("password"), null],
        i18n.t("validation:must be a match", { field: "Password" })
      ),
  });
