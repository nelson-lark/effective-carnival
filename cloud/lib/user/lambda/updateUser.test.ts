import updateUser from "./updateUser";
import { adminGetUserMock } from "../mocks";

const getUserSpy = jest.fn();
const getListGroups = jest.fn();
const updateUserSpy = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    CognitoIdentityServiceProvider: jest.fn().mockImplementation(() => {
      return {
        adminGetUser: () => ({
          promise: getUserSpy.mockReturnValue(adminGetUserMock),
        }),
        adminListGroupsForUser: () => ({
          promise: getListGroups.mockImplementation(() => Promise.resolve()),
        }),
        adminUpdateUserAttributes: () => ({
          promise: updateUserSpy.mockImplementation(() => Promise.resolve()),
        }),
      };
    }),
  };
});

describe("updateUser", () => {
  it("should return not found exception", async () => {
    const updatedUser = await updateUser({
      id: adminGetUserMock.Username,
      email: "test@email.com",
    });

    expect(getUserSpy).toHaveBeenCalled();
    expect(getListGroups).toHaveBeenCalled();
    expect(updateUserSpy).toHaveBeenCalled();
    expect(updatedUser).toEqual({
      email: "test@email.com",
      enabled: true,
      groupName: "",
      id: "c0dc679b-c4fa-434c-ba47-f65101075680",
      phoneNumber: "",
      updatedAt: "2021-07-22T13:30:25.699Z",
      verified: true,
    });
  });
});
