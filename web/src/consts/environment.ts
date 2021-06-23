const env = process.env.REACT_APP_EFFECTIVE_CARNIVAL_ENVIRONMENT;

export default {
  development: env?.endsWith("test") || env === "deve",
  graphqlApi: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_APPSYNC_URL,
};
