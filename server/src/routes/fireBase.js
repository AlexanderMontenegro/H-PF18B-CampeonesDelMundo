const express = require('express');
const router = express.Router();
const { firebaseAdmin, db } = require('../../fireBase/fireBaseConfig');

const auth = firebaseAdmin.auth();

// Ruta para registrar un nuevo usuario
// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
      const { email, password, displayName, name } = req.body;
  
      // Crear usuario en Firebase Auth
      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: displayName
      });
  
      // Guardar información adicional en Firestore
      await db.collection('users').doc(userRecord.uid).set({
        name: name,
        email: email,
        displayName: displayName,
        createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp()
      });
  
      res.status(200).send(`Usuario creado con ID: ${userRecord.uid}`);
    } catch (error) {
      res.status(500).send('Error al registrar el usuario: ' + error.message);
    }
  });

// Ruta para obtener todos los usuarios y sus roles
router.get('/users-with-roles', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();

    if (usersSnapshot.empty) {
      return res.status(404).send('No se encontraron usuarios');
    }

    let users = [];
    usersSnapshot.forEach(doc => {
      let userData = doc.data();
      userData.uid = doc.id;
      users.push(userData);
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios con roles: ' + error.message);
  }
});

// Ruta para obtener usuarios sin roles de administrador
// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
      const usersSnapshot = await db.collection('users').get();
  
      if (usersSnapshot.empty) {
        return res.status(404).send('No se encontraron usuarios');
      }
  
      let users = [];
      usersSnapshot.forEach(doc => {
        let userData = doc.data();
        userData.uid = doc.id;
        users.push(userData);
      });
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Error al obtener usuarios: ' + error.message);
    }
  });

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const userRecords = await auth.listUsers();

    const users = userRecords.users.map(user => ({
      uid: user.uid,
      name: user.customClaims && user.customClaims.name ? user.customClaims.name : null, // Verificar y manejar customClaims.name
      email: user.email,
      displayName: user.displayName
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios: ' + error.message);
  }
});

// Ruta para modificar datos del usuario
router.put('/users/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { displayName, name } = req.body;

    // Actualizar displayName en Firebase Auth
    await auth.updateUser(uid, {
      displayName: displayName
    });

    // Actualizar name en Firestore si es necesario
    if (name) {
      await db.collection('users').doc(uid).update({
        name: name
      });
    }

    res.status(200).send(`Usuario con ID ${uid} actualizado correctamente`);
  } catch (error) {
    res.status(500).send('Error al modificar datos del usuario: ' + error.message);
  }
});

// Ruta para borrar un usuario
router.delete('/users/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Obtener información del usuario antes de eliminarlo
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).send(`Usuario con ID ${uid} no encontrado`);
    }

    const userData = userDoc.data();

    // Borrar usuario en Firebase Auth
    await auth.deleteUser(uid);

    // Borrar documento de usuario en Firestore
    await db.collection('users').doc(uid).delete();

    res.status(200).json({ message: `Usuario con ID ${uid} eliminado correctamente`, deletedUser: userData });
  } catch (error) {
    res.status(500).send('Error al eliminar usuario: ' + error.message);
  }
});

// Ruta para asignar roles a un usuario específico
router.post('/assign-role', async (req, res) => {
  try {
    const { uid, role } = req.body;

    // Actualizar el rol del usuario en Firestore
    await db.collection('users').doc(uid).update({
      role: role
    });

    res.status(200).send(`Rol de usuario con ID ${uid} actualizado a ${role}`);
  } catch (error) {
    res.status(500).send('Error al asignar rol al usuario: ' + error.message);
  }
});

module.exports = router;
