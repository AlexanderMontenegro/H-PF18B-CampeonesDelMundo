// primero instalar npm install firebase-admin
//


const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./backcampeones-firebase-adminsdk-pywv7-bb0f714932.json'); // key fireBase

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://backcampeones.firebaseio.com' // Reemplaza con la URL de tu base de datos Firebase
});

const db = firebaseAdmin.firestore(); // Inicialización de Firestore

module.exports = { firebaseAdmin, db };
