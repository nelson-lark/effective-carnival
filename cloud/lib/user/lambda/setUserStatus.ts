import { StatusInput, User } from "../interfaces";
import { ErrorKey } from "../enums";
import { ErrorUser } from "../error";
import { cognitoIdentityServiceProvider } from "../config";
import { USER_POOL_ID } from "../constants";
import { getUserById } from "../utils";

const disableUser = async (userId: string): Promise<void> => {
  await cognitoIdentityServiceProvider
    .adminDisableUser({
      UserPoolId: USER_POOL_ID,
      Username: userId,
    })
    .promise();
};

const enableUser = async (userId: string): Promise<void> => {
  await cognitoIdentityServiceProvider
    .adminEnableUser({
      UserPoolId: USER_POOL_ID,
      Username: userId,
    })
    .promise();
};

const setUserStatus = async ({
  id,
  enabled,
}: StatusInput): Promise<User | void> => {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error(ErrorKey.UserNotPermission);

    if (enabled) {
      await enableUser(id);
    } else {
      await disableUser(id);
    }

    return { ...user, enabled };
  } catch (e) {
    throw new ErrorUser(e);
  }
};

export default setUserStatus;
