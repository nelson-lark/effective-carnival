module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@analytics/(.*)": "<rootDir>/lib/analytics/$1",
    "@authorization/(.*)": "<rootDir>/lib/authorization/$1",
    "@common/(.*)": "<rootDir>/lib/common/$1",
    "@consts/(.*)": "<rootDir>/consts/$1",
    "@enums/(.*)": "<rootDir>/enums/$1",
    "@utils/(.*)": "<rootDir>/utils/$1",
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!lib/**/*CdkConstruct.ts",
    "!lib/single-environment.ts",
    "!**/enums/*",
    "!bin/**",
    "!cdk.out/**",
    "!scripts/**",
  ],
};
