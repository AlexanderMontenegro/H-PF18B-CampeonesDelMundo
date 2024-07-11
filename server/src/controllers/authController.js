const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { firebaseAdmin, db } = require('../../fireBase/fireBaseConfig'); 
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("backcampeones"); 

const SECRET_KEY = process.env.SECRET_KEY;

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, address, cellphone } = req.body;

    // Crear usuario en Firebase Auth
    const userRecord = await firebaseAdmin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Guardar información adicional en Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
      displayName: name,
      address: address,
      cellphone: cellphone,
      role: role || 'user',
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp()
    });

    // Crear usuario en la base de datos local
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      cellphone
    });

    res.status(201).send({ message: 'User registered successfully!', userRecord });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autenticar usuario con Firebase
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    if (!userRecord) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Comparar contraseña con la base de datos local
    const userDB = await User.findOne({ where: { email } });
    const passwordIsValid = bcrypt.compareSync(password, userDB.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null, message: 'Error Password' });
    }

    // Generar token JWTn
    const token = jwt.sign({ id: userDB.id }, SECRET_KEY, {
      expiresIn: 86400 // 24 horas
    });

    const { id, name, role, address, cellphone } = userDB;
    const user = { id, name, email, role, address, cellphone };

    res.status(200).send({ auth: true, token: token, user, message: 'Autenticacion Exitosa' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};


exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    // crear usuario en db
    
    

    res.status(200).json({ user: payload, token: tokenId });
  } catch (error) {
    console.error('Error en el inicio de sesión con Google:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión con Google', error: error.message });
  }
};
// Código comentado que ya no se usa debido a la integración con Firebase

/*
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, address, cellphone } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const userDB = await User.findOne({ where: { email } });
    if (userDB) {
      return res.status(200).json({ message: 'Usuario registrado "Inicia sesion..."', userDB });
    }
    await User.create({ name, email, password: hashedPassword, role, address, cellphone });
    const user = { name, email, role, address, cellphone };

    res.status(201).send({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(200).send({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ where: { email } });
    if (!userDB) {
      return res.status(200).send({ message: 'User not found.' });
    }
    const hashedPassword = userDB.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);
    if (!passwordIsValid) {
      return res.status 200).send({ auth: false, token: null, message: 'Error Password' });
    }
    const token = jwt.sign({ id: userDB.id }, SECRET_KEY, {
      expiresIn: 86400 // 24 horas
    });

    const { id, name, role, address, cellphone } = userDB;
    const user = { id, name, email, role, address, cellphone };

    res.status(200).send({ auth: true, token: token, user, message: 'Autenticacion Exitosa' });
  } catch (error) {
    res.status(200).send({ message: 'Error logging in', error: error.message });
  }
};
*/
