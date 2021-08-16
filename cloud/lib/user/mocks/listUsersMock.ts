export const listUsersMock = {
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
  PaginationToken: "mocked-pagination-token",
  UserPool: {
    EstimatedNumberOfUsers: 10,
  },
};
