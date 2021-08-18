import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";

interface UserAttributes {
  email: string;
  phoneNumber: string;
}

function removeColon(value: string): string {
  const splitted = value.split(":");
  return splitted.length > 1 ? splitted[1] : splitted[0];
}

export const mapAttributes = (
  attributes: AttributeListType | undefined
): UserAttributes => {
  const attrs: { [key: string]: string | undefined } = {};

  attributes?.forEach((attr) => {
    const key = removeColon(attr.Name);
    attrs[key] = attr.Value ?? "";
  });

  return {
    email: attrs?.email ?? "",
    phoneNumber: attrs?.phone_number ?? "",
  };
};
