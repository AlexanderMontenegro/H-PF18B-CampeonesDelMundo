// routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const { getProductosHandlers } = require('../handlres/productHandlres');

router.get('/productos', getProductosHandlers);

module.exports = router;
