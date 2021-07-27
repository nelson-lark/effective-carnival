// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import path from "path";

import dotenvPlugin from "cypress-dotenv";

// @ts-ignore
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default (on: any, config: any): Record<string, string> => {
  config = dotenvPlugin(config, {
    path: path.resolve(process.cwd(), ".env.test"),
  });
  config = registerCodeCoverageTasks(on, config);
  config.baseUrl = config.env.BASE_URL;

  return config;
};
