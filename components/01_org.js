// Obtain a reference to the platformClient object
require('dotenv').config();
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

client.setEnvironment(platformClient.PureCloudRegionHosts.ca_central_1);

const CLIENT_ID = process.env.GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GENESYS_CLOUD_CLIENT_SECRET;

let organizationApi = new platformClient.OrganizationApi();

// Authenticate with Genesys Cloud
client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
.then(() => {
  console.log("Authentication Success!");
  organizationApi.getOrganizationsMe()
  .then((data) => {
    console.log(`getOrganizationsMe success! data: ${JSON.stringify(data, null, 2)}`);
  })
  .catch((err) => {
    console.log('There was a failure calling getOrganizationsMe');
    console.error(err);
  });
})
.catch((err) => {
  console.error(err);
});