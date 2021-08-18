import IdentityProviderName from "@enums/IdentityProviderName";
interface User {
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  providerName?: IdentityProviderName;
  sub: string;
  groups: string[];
}

export default User;
