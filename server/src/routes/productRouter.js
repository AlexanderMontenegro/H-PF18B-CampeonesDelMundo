const { Router } = require('express');
const { 
    productGetHandler, 
    getProductByIdHandler, 
    deleteIdHandler,
    createProductHandler 
} = require("../handlers/productHandlers");

const { validateProduct } = require('../middlewares/validation');

const productRouter = Router();




productRouter.get("/", productGetHandler);
productRouter.get("/:idProducto", getProductByIdHandler);
productRouter.post("/", validateProduct, createProductHandler);
productRouter.delete("/:idProducto", deleteIdHandler);


//Mepa que faltaria un update no? jajaj. att.Gonza

module.exports = productRouter;