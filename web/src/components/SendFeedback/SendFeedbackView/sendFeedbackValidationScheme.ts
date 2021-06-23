import { object, SchemaOf, string } from "yup";

import i18n from "@i18n/instance";

import SendFeedbackState from "./SendFeedbackState";

export default (): SchemaOf<SendFeedbackState> =>
  <SchemaOf<SendFeedbackState>>object({
    description: string().required(
      i18n.t("validation:is a required field", {
        field: i18n.t("field:Description"),
      })
    ),
  });
