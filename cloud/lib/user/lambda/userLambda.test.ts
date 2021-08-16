import LambdaTester from "lambda-tester";
import AWSMock from "aws-sdk-mock";

jest.mock("../utils", () => ({
  mapAttributes: jest.fn().mockReturnValue({
    email: "test@email.com",
    phoneNumber: "+48555111333",
  }),
  isBoolean: jest.fn(),
}));

const mockResponse = {
  Users: [
    {
      Username: "c0dc679b-c4fa-434c-ba47-f65101075680",
      Attributes: [
        {
          Name: "sub",
          Value: "c0dc679b-c4fa-434c-ba47-f65101075680",
        },
        {
          Name: "email_verified",
          Value: "false",
        },
        {
          Name: "phone_number_verified",
          Value: "false",
        },
        {
          Name: "phone_number",
          Value: "+48555333222",
        },
        {
          Name: "locale",
          Value: "pl",
        },
        {
          Name: "email",
          Value: "test@email.com",
        },
      ],
      UserCreateDate: "2021-07-21T18:04:08.145Z",
      UserLastModifiedDate: "2021-07-22T13:30:25.699Z",
      Enabled: true,
      UserStatus: "CONFIRMED",
    },
  ],
  UserPool: {
    EstimatedNumberOfUsers: 10,
  },
};

describe("userLambda", () => {
  const setup = (isError?: boolean) => {
    jest.mock("aws-sdk", () => {
      return {
        CognitoIdentityServiceProvider: class {
          listUsers() {
            return this;
          }
          describeUserPool() {
            return this;
          }
          promise() {
            if (isError) throw new Error();
            return Promise.resolve(mockResponse);
          }
        },
      };
    });
  };

  const event = {
    arguments: {
      getUsersArgs: {
        limit: 5,
      },
    },
    info: {
      fieldName: "getUsers",
    },
  };

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AWSMock.setSDKInstance(require("aws-sdk"));
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return list of users", async () => {
    setup();
    const module = await import("./userLambda");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await LambdaTester(module.handler)
      .event(event)
      .expectResult((result) => {
        expect(result).toEqual({
          items: [
            {
              id: "c0dc679b-c4fa-434c-ba47-f65101075680",
              enabled: true,
              updatedAt: "2021-07-22T13:30:25.699Z",
              verified: true,
              email: "test@email.com",
              phoneNumber: "+48555111333",
            },
          ],
          estimatedNumberOfUsers: 10,
          paginationToken: undefined,
        });
      });
  });

  it("should return error", async () => {
    setup(true);
    const module = await import("./userLambda");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await LambdaTester(module.handler).event(event).expectError();
  });
});
