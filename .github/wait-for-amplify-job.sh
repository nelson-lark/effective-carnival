app_id=$1
branch_name=$2
commitId=$3
max_retries=$4
sleep=$5

get_amplify_job_status () {
    echo "$(aws amplify list-jobs --app-id=$app_id --branch-name=$branch_name --no-paginate --output text --query "jobSummaries[?commitId=='$commitId'].status")"
}

counter=0
until [ $counter -ge $max_retries ]
do
  echo aws amplify list-jobs --app-id=$app_id --branch-name=$branch_name --no-paginate --output text --query \""jobSummaries[?commitId=='$commitId'].status"\"
  status=$(get_amplify_job_status)
  echo $status

  case $status in
    SUCCEED)
      exit 0
      ;;
    PENDING|RUNNING)
      sleep $sleep
      ((counter++))
      ;;  
    *)
      exit 1
      ;;
  esac
done

echo ----TIMEOUT----
exit 1