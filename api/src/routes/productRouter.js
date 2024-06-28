const { Router } = require('express');
const { 
    productGetHandler, 
    getProductByIdHandler, 
    deleteIdHandler,
    createProductHandler 
} = require("../handlers/productHandlers");



const productRouter = Router();




productRouter.get("/", productGetHandler);
productRouter.get("/:idProducto", getProductByIdHandler);
productRouter.post("/", createProductHandler);
productRouter.delete("/:idProducto", deleteIdHandler);


module.exports = productRouter;