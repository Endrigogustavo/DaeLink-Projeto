
const admin = require('firebase-admin');
const serviceAccount = require('./daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json');



    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

  const db = admin.firestore();
  

module.exports = { db };
