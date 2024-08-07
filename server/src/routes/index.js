const express = require('express');
const router = express.Router();
const productRouter = require("./productRouter");
const categoriaRouter = require("./categoriaRouter");
const authRouter = require('./authRouter');
const imageRouter = require('./imageRoutes');
const emailRouter = require('./emailRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const paymentRoutes = require('./paymentRoutes');
const reviewRouter = require('./reviewRouter');
//const fireRouter = require("./fireBase");

router.use('/productos', productRouter);
router.use("/categoria", categoriaRouter);
router.use('/auth', authRouter);
router.use('/images', imageRouter);
router.use('/emails', emailRouter);
router.use('/favorites', favoriteRoutes);
router.use('/api/payments', paymentRoutes);
router.use('/reviews', reviewRouter);
//router.use('/fire', fireRouter);

module.exports = router;
