Create 'normal' user

```
aws cognito-idp admin-create-user --user-pool-id eu-west-1_D43byyTrY --username j.kosciesza@codeandpepper.com
aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_D43byyTrY --username j.kosciesza@codeandpepper.com --password Mialem10Lat --permanent
```

Create 'admin' user

```
aws cognito-idp admin-create-user --user-pool-id eu-west-1_D43byyTrY --username j.kosciesza+admin@codeandpepper.com
aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_D43byyTrY --username j.kosciesza+admin@codeandpepper.com --password Mialem10Lat --permanent
aws cognito-idp create-group --group-name admin --user-pool-id eu-west-1_D43byyTrY
aws cognito-idp admin-add-user-to-group --user-pool-id eu-west-1_D43byyTrY --username j.kosciesza+admin@codeandpepper.com --group-name admin
```

Seed database (feedbacks table)

```
aws dynamodb batch-write-item --request-items file://feedbacks.json
```
