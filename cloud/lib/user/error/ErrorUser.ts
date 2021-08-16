enum ErrorList {
  Default = "Internal server error. Please try again.",
  InvalidParameterException = "Parameters do not match. Check and try again.",
  InvalidPasswordException = "Password do not match. Check and try again.",
  NotAuthorizedException = "Your accound is inactie. Contact your administrator to fix that.",
  TooManyRequestsException = "The limit of attempts is worn-out. Please start the procedure again.",
  UnsupportedUserStateException = "Internal server error. Please contact your administator.",
  UserNotPermission = "You cannot edit this user.",
  UserNotAlignToGroup = "You cannot edit this user.",
  UsernameExistsException = "An account with the given e-mail already exists",
  UserNotFoundException = "Your parameters do not match. Check and try again. If you have troubles with logging in please contact your administator.",
  TooManyCheck = "We have problem with check file. Please try again.",
  WrongPhoneNumber = "Change your phone number to correct schema: +(CountryCode)(Number). Example: +48728111111",
}

const makeErrorMessage = (message: string): string => {
  const keys = Object.keys(ErrorList);

  let result = ErrorList.Default;
  keys.forEach((key) => {
    if (message.toString().indexOf(key) !== -1)
      result = ErrorList[key as keyof typeof ErrorList];
  });

  return result;
};

export class ErrorUser extends Error {
  constructor(message: string) {
    super(message);
    // eslint-disable-next-line no-console
    console.error(message);
    this.message = makeErrorMessage(message);
  }
}
