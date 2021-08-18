export const isPhoneNumber = (phoneNumber: string): boolean =>
  new RegExp("^[+].[0-9]{5,14}$").test(phoneNumber);
