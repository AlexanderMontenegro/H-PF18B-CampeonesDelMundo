const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};
