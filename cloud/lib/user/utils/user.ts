import { CognitoIdentityServiceProvider } from "aws-sdk";

import { User } from "../interfaces";
import { UserStatusType } from "../enums";

import { mapAttributes } from "../utils";
import { ErrorUser } from "../error";
import { USER_POOL_ID } from "../constants";
import { cognitoIdentityServiceProvider } from "../config";

export const getUserGroup = async (
  id: string
): Promise<CognitoIdentityServiceProvider.AdminListGroupsForUserResponse | null> => {
  return cognitoIdentityServiceProvider
    .adminListGroupsForUser({ UserPoolId: USER_POOL_ID, Username: id })
    .promise();
};

export const getUser = async (
  id: string
): Promise<CognitoIdentityServiceProvider.AdminGetUserResponse | null> => {
  return cognitoIdentityServiceProvider
    .adminGetUser({ UserPoolId: USER_POOL_ID, Username: id })
    .promise();
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const [cognitoGroup, userDetails] = await Promise.all([
      getUserGroup(id),
      getUser(id),
    ]);

    if (userDetails) {
      const groupName = cognitoGroup?.Groups?.[0]?.GroupName ?? "";
      const { phoneNumber, email } = mapAttributes(userDetails.UserAttributes);

      return {
        id,
        groupName,
        enabled: !!userDetails.Enabled,
        updatedAt: userDetails.UserLastModifiedDate ?? "",
        verified: userDetails.UserStatus === UserStatusType.Confirmed,
        email,
        phoneNumber,
      };
    }
    return null;
  } catch (e) {
    throw new ErrorUser(e);
  }
};
