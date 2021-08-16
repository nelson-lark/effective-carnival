import { GetUsersArgs, UpdateUserInput, StatusInput } from "../interfaces";

import getUsers from "./getUsers";
import setUserStatus from "./setUserStatus";
import updateUser from "./updateUser";

type AppSyncEvent = {
  info: {
    fieldName: "getUsers" | "updateUser" | "setUserStatus";
  };
  arguments: {
    getUsersArgs: GetUsersArgs;
    updateUserInput: UpdateUserInput;
    statusInput: StatusInput;
  };
};

const handler = async (event: AppSyncEvent) => {
  const { getUsersArgs, updateUserInput, statusInput } = event.arguments;

  switch (event.info.fieldName) {
    case "getUsers":
      return await getUsers(getUsersArgs);
    case "updateUser":
      return await updateUser(updateUserInput);
    case "setUserStatus":
      return await setUserStatus(statusInput);
    default:
      return null;
  }
};

exports.handler = handler;
