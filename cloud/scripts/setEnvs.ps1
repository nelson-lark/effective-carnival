$script:stack="EffectiveCarnivalStackDevelopment"
$script:env="deve"
$script:envPrefix="deve-"

if ([Environment]::GetEnvironmentVariable('AWS_BRANCH') -eq "master")
{
    $script:stack="EffectiveCarnivalStackProduction"
    $script:env="prod"
    $script:envPrefix="prod-"
}

if ([Environment]::GetEnvironmentVariable('AWS_BRANCH') -eq "test")
{
    $script:stack="EffectiveCarnivalStackTest"
    $script:env="test"
    $script:envPrefix="test-"
}

if ([Environment]::GetEnvironmentVariable('AWS_BRANCH') -eq "staging")
{
    $script:stack="EffectiveCarnivalStackStaging"
    $script:env="stag"
    $script:envPrefix="stag-"
}

function Get-StackOutputValue () {
    param (
        $exportName
    )

    $script:stackOutputValue=aws cloudformation describe-stacks --stack-name $script:stack --query "Stacks[0].Outputs[?ExportName=='$script:envPrefix$exportName'].OutputValue" --output text

    Write-Output $script:stackOutputValue
}

$script:appsync_region=Get-StackOutputValue "graphqlRegion"
$script:appsync_url=Get-StackOutputValue "graphqlUrl"

$script:cognito_region=Get-StackOutputValue "cognitoRegion"
$script:cognito_identity=Get-StackOutputValue "cognitoIdentityPool"
$script:cognito_user_pool_id=Get-StackOutputValue "cognitoUserPoolId"
$script:cognito_user_pool_client_id=Get-StackOutputValue "cognitoUserPoolClientId"
$script:cognito_user_pool_domain=Get-StackOutputValue "cognitoUserPoolDomain"

$script:pinpoint_region=Get-StackOutputValue "pinpointRegion"
$script:pinpoint_project=Get-StackOutputValue "pinpointProjectId"

Write-Output REACT_APP_EFFECTIVE_CARNIVAL_ENVIRONMENT=$script:env

Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_APPSYNC_REGION=$script:appsync_region
Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_APPSYNC_URL=$script:appsync_url

Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_REGION=$script:cognito_region
Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_IDENTITY_POOL=$script:cognito_identity
Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_ID=$script:cognito_user_pool_id
Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_CLIENT_ID=$script:cognito_user_pool_client_id

Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_REGION=$script:pinpoint_region
Write-Output REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_PROJECT=$script:pinpoint_project

[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_ENVIRONMENT", $script:env, "User")

[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_APPSYNC_REGION", $script:appsync_region, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_APPSYNC_URL", $script:appsync_url, "User")

[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_REGION", $script:cognito_region, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_IDENTITY_POOL", $script:cognito_identity, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_ID", $script:cognito_user_pool_id, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_CLIENT_ID", $script:cognito_user_pool_client_id, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_DOMAIN", $script:cognito_user_pool_domain, "User")

[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_REGION", $script:pinpoint_region, "User")
[Environment]::SetEnvironmentVariable("REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_PROJECT", $script:pinpoint_project, "User")