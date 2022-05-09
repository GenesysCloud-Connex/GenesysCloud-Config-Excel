// Obtain a reference to the platformClient object
const platformClient = require('purecloud-platform-client-v2');

const client = platformClient.ApiClient.instance;
client.loginClientCredentialsGrant(clientId,clientSecret)
.then(()=> {
  // Do authenticated things
})
.catch((err) => {
 // Handle failure response
 console.log(err);
});