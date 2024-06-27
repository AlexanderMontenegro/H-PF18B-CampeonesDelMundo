const { Router } = require('express');
const { getProductosHandlres } = require("../handlres/productHandlres");



const productRouter = Router();




productRouter.get("/producto", getProductosHandlres);


module.export = productRouter;