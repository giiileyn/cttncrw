// firebaseConfig.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://cttncrw-2b10e-default-rtdb.firebaseio.com/',
});

module.exports = admin;
