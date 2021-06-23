import * as cdk from "@aws-cdk/core";

import * as pinpoint from "@aws-cdk/aws-pinpoint";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface PinpointProps {
  envName: EnvName;
}

export class PinpointCdkConstruct extends cdk.Construct {
  private readonly pinpointApp: pinpoint.CfnApp;

  constructor(scope: cdk.Construct, id: string, { envName }: PinpointProps) {
    super(scope, id);

    // ========================================================================
    // Resource: Amazon Pinpoint
    // ========================================================================

    // Purpose: used for analytics

    this.pinpointApp = new pinpoint.CfnApp(
      this,
      `${envName}-PinpointApplication`,
      {
        name: `${envName}-analytics`,
      }
    );

    applyTagsToResource([this.pinpointApp], {
      envName,
      purpose: ServicePurpose.Analytics,
    });

    // ========================================================================
    // Exports
    // ========================================================================

    new cdk.CfnOutput(this, `${envName}-PinpointProjectIdExport`, {
      exportName: `${envName}-pinpointProjectId`,
      value: this.pinpointApp.ref,
    });

    new cdk.CfnOutput(this, `${envName}-PinpointRegionExport`, {
      exportName: `${envName}-pinpointRegion`,
      value: process.env.CDK_DEFAULT_REGION!,
    });
  }

  /**
   * Returns pinpoint's ARN
   */
  get pinpointArn(): string {
    return this.pinpointApp.attrArn;
  }
}
