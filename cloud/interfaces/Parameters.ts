import { IStringParameter } from "@aws-cdk/aws-ssm/lib/parameter";

export interface Parameters {
  appleClientId: IStringParameter;
  appleTeamId: IStringParameter;
  appleKeyId: IStringParameter;
  applePrivateKey: IStringParameter;
  facebookClientId: IStringParameter;
  facebookSecret: IStringParameter;
  googleClientId: IStringParameter;
  googleSecret: IStringParameter;
}
