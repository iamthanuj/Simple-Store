'use strict'
const dotenv = require("dotenv");
const admin = require('firebase-admin');
dotenv.config();
// const serviceAccount = require('../cred.json');

const serviceAccount2 = {
  type: process.env.CRED_TYPE,
  project_id: process.env.CRED_PROJECT_ID,
  private_key_id: process.env.CRED_PRIVATE_KEY_ID,
  private_key: process.env.CRED_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CRED_CLIENT_EMAIL,
  client_id: process.env.CRED_CLIENT_ID,
  auth_uri: process.env.CRED_AUTH_URI,
  token_uri: process.env.CRED_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.CRED_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CRED_CLIENT_X509_CERT_URL,
  universe_domain: process.env.CRED_UNIVERSE_DOMAIN
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount2),
    databaseURL: 'https://simple-store-b5772-default-rtdb.asia-southeast1.firebasedatabase.app' 
  });

  module.exports = admin;