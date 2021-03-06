import { MAX_STRING_LENGTH } from "@consts/index";

const validateMaxStringLength = (value?: string): boolean => {
  return typeof value === "undefined" || value.length <= MAX_STRING_LENGTH;
};

export default validateMaxStringLength;
