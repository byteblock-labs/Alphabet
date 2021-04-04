pm2 stop app.js
cd /home/ByteBlockSDK/test-network/
./network.sh down
rm -rf /home/ByteBlockSDK/QuotaCareer/application-javascript/wallet/
./network.sh up createChannel -ca -s couchdb; ./network.sh deployCC -ccn ledger -ccp ../QuotaCareer/chaincode-javascript/ -ccl javascript
cd -
pm2 start app.js
