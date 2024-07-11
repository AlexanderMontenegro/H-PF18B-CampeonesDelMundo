// primero instalar npm install firebase-admin

require("dotenv").config();

const firebaseAdmin = require("firebase-admin");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://backcampeones.firebaseio.com",
});

const db = firebaseAdmin.firestore();

module.exports = { firebaseAdmin, db };
