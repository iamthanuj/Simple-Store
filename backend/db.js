const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
const config = require("./config");

const firebaseApp = initializeApp(config.firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

module.exports = {
    db,
    storage,
}