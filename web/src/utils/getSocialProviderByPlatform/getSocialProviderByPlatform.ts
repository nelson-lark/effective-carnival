import IdentityProviderName from "@enums/IdentityProviderName";
import SocialPlatform from "@enums/SocialPlatform";

// There are no types to import from aws-amplify library, so we have to use "any"
// eslint-disable-next-line
const getSocialProviderByPlatform = (socialPlatform: SocialPlatform): any => {
  switch (socialPlatform) {
    case SocialPlatform.Apple:
      return IdentityProviderName.Apple;
    case SocialPlatform.Facebook:
      return IdentityProviderName.Facebook;
    default:
      return IdentityProviderName.Google;
  }
};

export default getSocialProviderByPlatform;
