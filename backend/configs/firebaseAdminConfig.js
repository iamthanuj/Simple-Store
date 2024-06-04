const admin = require('firebase-admin');
const serviceAccount = require('../cred.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://simple-store-b5772-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your databaseURL
  });

  module.exports = admin;