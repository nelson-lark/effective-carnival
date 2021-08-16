import setUserStatus from "./setUserStatus";
import { adminGetUserMock } from "../mocks";

const getUserSpy = jest.fn();
const getListGroups = jest.fn();
const adminDisableUserSpy = jest.fn();
const adminEnableUserSpy = jest.fn();

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
        adminDisableUser: () => ({
          promise: adminDisableUserSpy.mockImplementation(() =>
            Promise.resolve()
          ),
        }),
        adminEnableUser: () => ({
          promise: adminEnableUserSpy.mockImplementation(() =>
            Promise.resolve()
          ),
        }),
      };
    }),
  };
});

describe("setUserStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should disable user", async () => {
    await setUserStatus({
      id: "unique-id",
      enabled: false,
    });

    expect(adminDisableUserSpy).toHaveBeenCalledTimes(1);
    expect(adminEnableUserSpy).not.toHaveBeenCalled();
  });

  it("should enable user", async () => {
    await setUserStatus({
      id: "unique-id",
      enabled: true,
    });

    expect(adminEnableUserSpy).toHaveBeenCalledTimes(1);
    expect(adminDisableUserSpy).not.toHaveBeenCalled();
  });
});
