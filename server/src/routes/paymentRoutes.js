const express = require('express');
const { createPreference } = require('../controllers/mercadoPagoController');
const router = express.Router();

router.post('/create-preference', createPreference);

module.exports = router;

