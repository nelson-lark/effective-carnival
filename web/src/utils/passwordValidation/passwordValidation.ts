import { string } from "yup";
import StringSchema from "yup/lib/string";

import i18n from "@i18n/instance";

import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from "@consts/index";

export default (): StringSchema<
  string | undefined,
  Record<string, unknown>,
  string | undefined
> =>
  string()
    .required(
      i18n.t("validation:is a required field", {
        field: i18n.t("field:Password"),
      })
    )
    .matches(
      /[a-z]/,
      i18n.t("validation:should contain lower case letters", {
        field: i18n.t("field:Your password"),
      })
    )
    .matches(
      /[A-Z]/,
      i18n.t("validation:should contain upper case letters", {
        field: i18n.t("field:Your password"),
      })
    )
    .matches(
      /\d/,
      i18n.t("validation:should contain digits", {
        field: i18n.t("field:Your password"),
      })
    )
    .min(
      MIN_STRING_LENGTH,
      i18n.t("validation:is too short", {
        field: i18n.t("field:Your password"),
        length: MIN_STRING_LENGTH,
      })
    )
    .max(
      MAX_STRING_LENGTH,
      i18n.t("validation:is too long", {
        field: i18n.t("field:Your password"),
        length: MAX_STRING_LENGTH,
      })
    );
