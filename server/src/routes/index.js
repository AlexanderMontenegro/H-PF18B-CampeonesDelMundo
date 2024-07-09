// routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const productRouter = require("./productRouter");
const categoriaRouter = require("./categoriaRouter");
const authRouter = require('./authRouter');
const imageRouter = require('./imageRoutes');
<<<<<<< HEAD
const emailRouter = require('./emailRoutes');
=======
//const fireRouter = require("./fireBase");
>>>>>>> c05dbf8511cebebaabba7fb9c627922ed209c09d

router.use('/productos', productRouter);
router.use("/categoria", categoriaRouter);
router.use('/auth', authRouter);
router.use('/images', imageRouter);
<<<<<<< HEAD
router.use('/emails', emailRouter);
=======
//router.use('/fire', fireRouter);
>>>>>>> c05dbf8511cebebaabba7fb9c627922ed209c09d

module.exports = router;
