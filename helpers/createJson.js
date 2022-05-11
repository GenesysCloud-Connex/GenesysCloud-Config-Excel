// Obtain a reference to the platformClient object
require("dotenv").config();
const { jsonOrg } = require("../components/01_org");
const platformClient = require("purecloud-platform-client-v2");
const client = platformClient.ApiClient.instance;

client.setEnvironment(platformClient.PureCloudRegionHosts.ca_central_1);

const CLIENT_ID = process.env.GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GENESYS_CLOUD_CLIENT_SECRET;

// Authenticate with Genesys Cloud
client
  .loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
  .then(() => {
    console.log("Authentication Success!");
    jsonOrg();
  })
  .catch((err) => {
    console.error(err);
  });
