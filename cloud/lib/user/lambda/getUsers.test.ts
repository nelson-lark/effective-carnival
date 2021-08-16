import getUsers from "./getUsers";
import { describeUserPoolMock, listUsersMock } from "../mocks";

jest.mock("aws-sdk", () => {
  return {
    CognitoIdentityServiceProvider: jest.fn().mockImplementation(() => {
      return {
        describeUserPool: () => ({
          promise: () => Promise.resolve(describeUserPoolMock),
        }),
        listUsers: () => ({
          promise: () => Promise.resolve(listUsersMock),
        }),
      };
    }),
  };
});

describe("getUsers", () => {
  it("should return users data", async () => {
    const users = await getUsers({ limit: 10 });
    expect(users).toEqual({
      estimatedNumberOfUsers: 10,
      items: [
        {
          email: "test@email.com",
          enabled: true,
          id: "c0dc679b-c4fa-434c-ba47-f65101075680",
          phoneNumber: "+48555333222",
          updatedAt: "2021-07-22T13:30:25.699Z",
          verified: true,
        },
      ],
      paginationToken: "mocked-pagination-token",
    });
  });
});
