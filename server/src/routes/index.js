// routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const productRouter = require("./productRouter");
const categoriaRouter = require("./categoriaRouter");
const authRouter = require('./authRouter');
const imageRouter = require('./imageRoutes');
//const fireRouter = require("./fireBase");

router.use('/productos', productRouter);
router.use("/categoria", categoriaRouter);
router.use('/auth', authRouter);
router.use('/images', imageRouter);
//router.use('/fire', fireRouter);

module.exports = router;
