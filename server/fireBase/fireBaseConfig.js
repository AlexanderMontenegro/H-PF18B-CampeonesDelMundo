// primero instalar npm install firebase-admin
//


const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../fireBase/backcampeones-firebase-adminsdk-pywv7-bb0f714932.json'); // key fireBase
const databaseURL = 'https://backcampeones.firebaseio.com'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: databaseURL // Reemplaza con la URL de tu base de datos Firebase
});

const db = firebaseAdmin.firestore(); // Inicialización de Firestore

module.exports = { firebaseAdmin, db };
