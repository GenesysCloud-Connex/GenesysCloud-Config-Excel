// Obtain a reference to the platformClient object
require("dotenv").config();
const path = require("path")
const xlsx = require("json-as-xlsx");
const platformClient = require("purecloud-platform-client-v2");
const client = platformClient.ApiClient.instance;

client.setEnvironment(platformClient.PureCloudRegionHosts.ca_central_1);

const CLIENT_ID = process.env.GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GENESYS_CLOUD_CLIENT_SECRET;

let organizationApi = new platformClient.OrganizationApi();

// Authenticate with Genesys Cloud
client
  .loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
  .then(() => {
    console.log("Authentication Success!");
    organizationApi
      .getOrganizationsMe()
      .then((data) => {
        console.log(
          `getOrganizationsMe success! data: ${JSON.stringify(data, null, 2)}`
        );
        let dataArr = [];
        let obj = {
          sheet: "Organization_V2",
          columns: [],
          content: [],
        };
        let col = [];

        Object.keys(data).forEach(function (key) {
          let dataColumn = { label: key, value: key }; // Top level data
          col.push(dataColumn);
          return col;
        });
        obj.columns = col;
        obj.content = [data];
        dataArr.push(obj);
        console.log(obj);
        
        const output = path.resolve(__dirname, "../output", "output")

        const settings = {
          fileName: output, // Name of the resulting spreadsheet
          extraLength: 3, // A bigger number means that columns will be wider
          writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
        };
        xlsx(dataArr, settings);
      })
      .catch((err) => {
        console.log("There was a failure calling getOrganizationsMe");
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
