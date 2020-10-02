import Keycloak from 'keycloak-js';

const AUTH_URL= process.env.AUTH_URL || "http://localhost/auth";
const AUTH_REALM=process.env.AUTH_REALM ||  "kyc-realm" ; 
const AUTH_CLIENTID=process.env.AUTH_CLIENTID ||  "kyc-clientId";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: AUTH_URL,
  realm: AUTH_REALM,
  clientId: AUTH_CLIENTID,
});

export default keycloak;