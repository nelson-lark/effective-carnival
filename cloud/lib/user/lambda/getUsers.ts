import { CognitoIdentityServiceProvider } from "aws-sdk";

import { User, GetUsersArgs, GetUsersResponse } from "../interfaces";
import { UserStatusType } from "../enums";

import { ErrorUser } from "../error";
import { mapAttributes, isBoolean } from "../utils";
import { USER_POOL_ID } from "../constants";
import { cognitoIdentityServiceProvider } from "../config";

const getFilterString = ({
  searchBy,
  enabled,
  verified,
}: {
  searchBy?: string;
  enabled?: boolean;
  verified?: boolean;
}) => {
  if (searchBy) {
    return `email ^= \"${searchBy}\"`;
  }
  if (isBoolean(enabled)) {
    return `status = \"${enabled ? "Enabled" : "Disabled"}\"`;
  }
  if (isBoolean(verified)) {
    return `cognito:user_status = \"${
      verified ? UserStatusType.Confirmed : UserStatusType.Unconfirmed
    }\"`;
  }
  return "";
};

async function getUsers({
  searchBy,
  limit,
  paginationToken,
  filterBy,
}: GetUsersArgs): Promise<GetUsersResponse | void> {
  try {
    const { verified, enabled } = filterBy ?? {};

    const filterString = getFilterString({ searchBy, verified, enabled });

    const params: CognitoIdentityServiceProvider.ListUsersRequest = {
      UserPoolId: USER_POOL_ID,
      Limit: limit,
      Filter: filterString,
      PaginationToken: paginationToken,
    };

    const response = await cognitoIdentityServiceProvider
      .listUsers(params)
      .promise();

    const userPoolDetailsResponse = await cognitoIdentityServiceProvider
      .describeUserPool({ UserPoolId: USER_POOL_ID })
      .promise();

    const usersResponse = response?.Users ?? [];
    let users: User[] = [];
    if (usersResponse) {
      users = usersResponse.map(
        ({
          Username,
          Attributes,
          Enabled,
          UserLastModifiedDate,
          UserStatus,
        }) => {
          const { email, phoneNumber } = mapAttributes(Attributes);
          return {
            id: Username || "",
            enabled: !!Enabled,
            updatedAt: UserLastModifiedDate ?? "",
            verified: UserStatus === UserStatusType.Confirmed,
            email,
            phoneNumber,
          };
        }
      );
    }

    return {
      items: users,
      paginationToken: response?.PaginationToken,
      estimatedNumberOfUsers:
        userPoolDetailsResponse?.UserPool?.EstimatedNumberOfUsers,
    };
  } catch (e) {
    throw new ErrorUser(e);
  }
}

export default getUsers;
