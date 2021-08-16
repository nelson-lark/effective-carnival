npm run schema

cd ../pdfGenerator || exit
npm install
npm run build
cd ../cloud || exit

./node_modules/.bin/cdk deploy "$1" --require-approval never --v