const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, address, cellphone } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    
const userDB = await await User.findOne({ where: { email } });
    if (userDB) {
      return res.status(200).json({ message: 'Usuario registrado "Inicia sesion..."', userDB });
  } 
await User.create({ name, email, password: hashedPassword, role, address, cellphone });
const user = {name, email, role, address, cellphone};


    res.status(201).send({ message: 'User registered successfully!' , user});
  } catch (error) {
    res.status(200).send({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ where: { email } });
    if (!userDB) {
      return res.status(200).send({message:'User not found.'});
    }
const hashedPassword = userDB.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);
    if (!passwordIsValid) {
      return res.status(200).send({ auth: false, token: null, message:'Error Password' });
    }
console.log('secret key',SECRET_KEY)
    const token = jwt.sign({ id: userDB.id }, SECRET_KEY, {
      expiresIn: 86400 // 24 horas
    });

    console.log('token', token)

    //Filtrar password para res con datos del usuario
    const {id, name, role, address, cellphone} = userDB;
    const user = {id, name, email, role, address, cellphone};

    res.status(200).send({ auth: true, token: token, user, message:'Autenticacion Exitosa' });
  } catch (error) {
    console.log('erroer',error)
    res.status(200).send({ message: 'Error logging in', error: error.message });
  }
};
