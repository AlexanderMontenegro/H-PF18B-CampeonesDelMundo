const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
/* router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send({ auth: true, message: 'Access granted.' });
}); */

module.exports = router;
