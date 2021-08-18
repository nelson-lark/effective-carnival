import getSocialProviderByPlatform from "@utils/getSocialProviderByPlatform";
import IdentityProviderName from "@enums/IdentityProviderName";
import SocialPlatform from "@enums/SocialPlatform";

describe("getSocialProviderByPlatform()", () => {
  it("should return 'SignInWithApple' when SocialPlatform.Apple provided", () => {
    expect(getSocialProviderByPlatform(SocialPlatform.Apple)).toEqual(
      IdentityProviderName.Apple
    );
  });

  it("should return 'Facebook' when SocialPlatform.Facebook provided", () => {
    expect(getSocialProviderByPlatform(SocialPlatform.Facebook)).toEqual(
      IdentityProviderName.Facebook
    );
  });

  it("should return 'Google' when SocialPlatform.Google provided", () => {
    expect(getSocialProviderByPlatform(SocialPlatform.Google)).toEqual(
      IdentityProviderName.Google
    );
  });
});
