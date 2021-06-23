const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@enums": path.resolve(__dirname, "src/types/enums"),
      "@features": path.resolve(__dirname, "src/features"),
      "@generated": path.resolve(__dirname, "src/types/generated"),
      "@interfaces": path.resolve(__dirname, "src/types/interfaces"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@routing": path.resolve(__dirname, "src/routing"),
      "@themes": path.resolve(__dirname, "src/themes"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  };
  return config;
};

module.exports.jest = (config) => {
  config.transformIgnorePatterns = [
    ",/node_modules/(?!@hookform/*).+\\.[t|j]sx?$",
  ];
  config.collectCoverageFrom = [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/consts/*.{js,jsx,ts,tsx}",
    "!src/features/**/*.{js,jsx,ts,tsx}",
    "!src/types/enums/*.{js,jsx,ts,tsx}",
    "!src/types/generated/*.{js,jsx,ts,tsx}",
    "!src/types/interfaces/*.{js,jsx,ts,tsx}",
    "!src/i18n/*.{js,jsx,ts,tsx}",
    "!src/mocks/*.{js,jsx,ts,tsx}",
    "!src/__mocks__/*.{js,jsx,ts,tsx}",
    "!src/**/*.generated.{ts,tsx}",
    "!src/**/*State.ts",
    "!src/awsConfig.ts",
    "!src/reportWebVitals.ts",
    "!src/index.tsx",
    "!src/react-app-env.d.ts",
    "!src/**/index.ts",
  ];
  config.testTimeout = 15_000;
  return config;
};
