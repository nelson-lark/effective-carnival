# effective-carnival CDK project

This is AWS's cloud (CDK-based) and backend part of the effective-carnival app.

## Useful commands

Command                                                                 | Description
-----                                                                   | -----------
`yarn build`                                                            | compile typescript to js
`./scripts/buildEmail.bash [template_name]`                             | Build HTML email template from MJML
`./scripts/buildStack.bash [stack_name]`                                | Build GraphQL schema & deploy stack
`yarn watch`                                                            | watch for changes and compile
`yarn test`                                                             | perform the jest unit tests
`yarn schema`                                                           | generate stitched GraphQL schema
`cdk diff [stack]`                                                      | compare deployed stack with current state
`cdk synth`                                                             | emits the synthesized CloudFormation template
`cdk destroy [stack]`                                                   | destroy whole CloudFormation stack except for S3 buckets, user pools, Dynamo tables, log groups and ElasticSearch domains
`npm run destroy -- --stack [stack] --env [environment_name]`           | destroy whole CloudFormation stack

## Test stack deployments

Stack id is `EffectiveCarnivalStack[Developer initials uppercase]Test` like `EffectiveCarnivalStackPMTest`

### Deploy

`cdk deploy [stackId]`
