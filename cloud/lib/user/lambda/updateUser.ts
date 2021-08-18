import { ErrorUser } from "../error";
import { cognitoIdentityServiceProvider } from "../config";
import { UpdateUserInput, User } from "../interfaces";
import { ErrorKey } from "../enums";
import { isPhoneNumber, getUserById } from "../utils";
import { USER_POOL_ID } from "../constants";

const updateUser = async ({
  id,
  email,
  phoneNumber,
}: UpdateUserInput): Promise<User | null> => {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error(ErrorKey.UserNotPermission);
    if (phoneNumber && !isPhoneNumber(phoneNumber ?? ""))
      throw new Error(ErrorKey.WrongPhoneNumber);

    let attributes = [];
    attributes = [
      ...(phoneNumber ? [{ Name: "phone_number", Value: phoneNumber }] : []),
      ...(email ? [{ Name: "email", Value: email }] : []),
    ];

    if (attributes.length) {
      const params = {
        UserPoolId: USER_POOL_ID,
        Username: id,
        UserAttributes: attributes,
      };

      await cognitoIdentityServiceProvider
        .adminUpdateUserAttributes(params)
        .promise();
    }

    return {
      ...user,
      email: email ?? user.email,
      phoneNumber: phoneNumber ?? user.phoneNumber,
    };
  } catch (e) {
    throw new ErrorUser(e);
  }
};

export default updateUser;
