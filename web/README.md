# EffectiveCarnival project

This is the frontend part of the EffectiveCarnival app.

## yarn

Use yarn. There is high likelihoog that `npm install` won't resolve due to some odd dependency issues. `yarn` provides no such trouble.

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

1. Copy example env file: `cp .env.test.example .env.test`
2. Populate it with your own values
3. For `CYPRESS_AWS_COGNITO_USER_POOL_ID` copy paste value returned by `cloud/scripts/setEnvs.bash` script

#### Run Cypress tests in the headfull mode:

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

## Cypress code coverage

The code coverage report will be generated automatically after the test run.

To see the full code coverage report open the `cypress/code-coverage/lcov-report/index.html` file.

#### Run Cypress tests in the headless mode and generate code coverage report after them:

```
yarn cy:coverage:run
```

#### Run Cypress tests in the headfull mode and generate code coverage report after them:

```
yarn cy:coverage:open
```

#### To generate the code coverage summary in the terminal after the test run use:

```
npx nyc report --reporter=text-summary
```

## Packages included and configured for E2E tests:

- `cypress/code-coverage` - it generates a code coverage report after Cypress tests
- `cypress-dotenv` - plugin that enables compatability with `dotenv` package
- `cypress-file-upload` - file upload testing made easy with Cypress 
- `cypress-xpath` - it adds XPath command to Cypress test runner
- `eslint-plugin-cypress` - an ESLint plugin for your Cypress tests
- `faker` - it generates fake data for tests
- `percy/cypress` - detecting and reviewing visual UI changes by making snapshots
