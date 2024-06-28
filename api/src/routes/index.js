// routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const productRouter = require("./productRouter");
const categoriaRouter = require("./categoriaRouter")

router.use('/productos', productRouter);
router.use("/categoria", categoriaRouter);

module.exports = router;
