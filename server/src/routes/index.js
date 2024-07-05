// routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const productRouter = require("./productRouter");
const categoriaRouter = require("./categoriaRouter");
const authRouter = require('./authRouter');
const imageRouter = require('./imageRoutes');

router.use('/productos', productRouter);
router.use("/categoria", categoriaRouter);
router.use('/auth', authRouter);
router.use('/images', imageRouter);

module.exports = router;
