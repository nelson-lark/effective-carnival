# effective-carnival project

This is the frontend part of the effective-carnival app.

## yarn

Use yarn. There is high likelihood that `npm install` won't resolve due to some odd dependency issues. `yarn` provides no such trouble.

## Useful commands

Command                                                                 | Description
-----                                                                   | -----------
`yarn build`                                                            | compile Typescript to JavaScript
`yarn start`                                                            | start development environment
`yarn test`                                                             | perform the jest unit tests
`yarn format`                                                           | format files with prettier
`yarn lint`                                                             | run eslint
`yarn generate-graphql`                                                 | generate gql typedefs based on cloud

# E2E tests

## Running E2E tests

### Setup env variables for tests

1. Copy example env file: `cp .env.example .env`
2. Populate it with your own values returned by `cloud/scripts/setEnvs.bash` script (`cloud/scripts/setEnvs.ps1` on Windows). 
To run this script you can use the following command `source ./setEnvs.bash` (`./setEnvs.ps1` on Windows)
3. Copy example test env file: `cp .env.test.example .env.test`
4. Populate it with your own values
5. For `AWS_COGNITO_USER_POOL_ID` copy paste value returned by `cloud/scripts/setEnvs.bash` script
#### Run Cypress tests in the graphical mode:

```
yarn cy:open
```

#### Run all Cypress tests in the headless mode:

```
yarn cy:run
```

#### Run Cypress smoke tests in the headless mode:

```
yarn cy:run:smoke
```

#### Run Cypress regression tests in the headless mode:

```
yarn cy:run:regression
```

## Code coverage

If you want to generate code coverage report after the Cypress tests you should run the server via command:

```
yarn cy:coverage:start
```

and then run the Cypress tests:

```
yarn cy:run
```

The code coverage report will be generated automatically after the test run is finished.

To see the full code coverage report open the `cypress/reports/code-coverage/index.html` file.

To generate the code coverage summary in the terminal after the test run use:
```
yarn nyc report --reporter=text-summary
```

## Mochawesome reporter

If you want to see the mochawesome report you have to generate it manually (when the Cypress tests are finished) using:

```
yarn cy:mocha:generate:report
```

The test reports will **not** be generated automatically after the test run!

To see the mochawesome report open the `cypress/reports/mochawesome/final-report/summary.html` file.

**Attention**: You should remove the report before generating another one. You can do it manually or use a simple command:

```
yarn cy:mocha:clean
```

## Prettier & ESLint

Run Prettier under the `cypress` directory:

```
yarn cy:format
```

Run ESLint under the `cypress` directory:

```
yarn cy:lint
```

## Packages included and configured for E2E tests:

- [`@cypress/code-coverage`](https://www.npmjs.com/package/@cypress/code-coverage) - it generates a code coverage report after Cypress tests
- [`@cypress/instrument-cra`](https://www.npmjs.com/package/@cypress/instrument-cra) - instrument code without ejecting react-scripts
- [`cypress-dotenv`](https://www.npmjs.com/package/cypress-dotenv) - plugin that enables compatability with `dotenv` package
- [`cypress-file-upload`](https://www.npmjs.com/package/cypress-file-upload) - file upload testing made easy with Cypress
- [`cypress-localstorage-commands`](https://www.npmjs.com/package/cypress-localstorage-commands) - it allows preserving localStorage between tests
- [`cypress-xpath`](https://www.npmjs.com/package/cypress-xpath) - it adds XPath command to Cypress test runner
- [`eslint-plugin-cypress`](https://www.npmjs.com/package/eslint-plugin-cypress) - an ESLint plugin for your Cypress tests
- [`faker`](https://www.npmjs.com/package/faker) - it generates fake data for tests
- [`mochawesome`](https://www.npmjs.com/package/mochawesome) - a custom reporter for use to generate tests report after test run
- [`mochawesome-merge`](https://www.npmjs.com/package/mochawesome-merge) - it merges several Mochawesome JSON reports
- [`mochawesome-report-generator`](https://www.npmjs.com/package/mochawesome-report-generator) - it generates HTML reports from mochawesome reporter.
- [`@percy/cypress`](https://www.npmjs.com/package/@percy/cypress) - detecting and reviewing visual UI changes by making snapshots
