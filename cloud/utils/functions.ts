import * as ssm from "@aws-cdk/aws-ssm";

import { Construct, IConstruct, Tags } from "@aws-cdk/core";

import { EnvName } from "@enums/EnvName";

/**
 * Utility, which applies purpose and env tags to the resources
 * @param resources - Resources, which shall be tagged
 * @param envName   - Environment name
 * @param purpose   - Purpose of resources
 * @param tags      - Optional custom tags in [tagName, value] form
 */
export const applyTagsToResource: (
  resources: IConstruct[],
  params: {
    envName: EnvName;
    purpose: string;
  },
  tags?: [string, string][]
) => void = (resources, { envName, purpose }, tags = []) => {
  for (const resource of resources) {
    Tags.of(resource).add("ResourceEnvironment", envName);
    Tags.of(resource).add("ResourcePurpose", purpose);
    for (const tag of tags) {
      Tags.of(resource).add(tag[0], tag[1]);
    }
  }
};

/**
 * Capitalizes first letter of string
 * @param s
 */
const capitalizeFirstCharacter: (s: string) => string = (s) =>
  s[0].toUpperCase() + s.slice(1);

/**
 * Generates CDK ID based on parameter's name
 * @param parameterName - Name of the parameter to grab in standard AWS format - fe "/google/oauth/client_id"
 */
export const generateIdFromParameter: (parameterName: string) => string = (
  parameterName
) =>
  parameterName
    .slice(1)
    .split("/")
    .map((s) => {
      if (s.includes("_")) {
        return s
          .split("_")
          .map((str) => capitalizeFirstCharacter(str))
          .join("");
      }
      return capitalizeFirstCharacter(s);
    })
    .join("-");

/**
 * Utility, which grabs certain value from AWS SSM Parameter Store
 * @param construct     - CDK Construct, where the parameter belongs
 * @param envName       - Environment name
 * @param parameterName - Name of the parameter to grab in standard AWS format - fe "/google/oauth/client_id"
 */
export const getParameterFromParameterStore: (
  construct: Construct,
  envName: EnvName,
  parameterName: string
) => ssm.IStringParameter = (construct, envName, parameterName) =>
  ssm.StringParameter.fromStringParameterAttributes(
    construct,
    `${envName}-SSM-${generateIdFromParameter(parameterName)}`,
    {
      parameterName,
    }
  );

/**
 * Returns stack name by environment. For example EnvName.Development => EffectiveCarnivalStackDevelopment
 * @param envName
 */
export const getStackNameByEnvName: (envName: EnvName) => string = (envName) =>
  `EffectiveCarnivalStack${
    (Object.entries(EnvName).find((env) => env[1] === envName) ?? [
      "Development",
    ])[0]
  }`;
