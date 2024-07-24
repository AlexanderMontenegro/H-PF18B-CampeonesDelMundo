const { Router } = require('express');
const { 
    productGetHandler, 
    getProductByIdHandler, 
    deleteIdHandler,
    createProductHandler,
    updateStockHandler,
    softDeleteProductHandler,
    restoreProductHandler,
    updateProductHandler
} = require("../handlers/productHandlers");

const { validateProduct } = require('../middlewares/validation');

const productRouter = Router();




productRouter.get("/", productGetHandler);
productRouter.get("/:idProducto", getProductByIdHandler);
productRouter.post("/", validateProduct, createProductHandler);
productRouter.delete("/:idProducto", deleteIdHandler);
productRouter.put("/:idProducto/stock", updateStockHandler);
productRouter.put("/delete/:idProducto", softDeleteProductHandler);
productRouter.put("/restore/:idProducto", restoreProductHandler);
productRouter.put("/update", updateProductHandler);


//Mepa que faltaria un update no? jajaj. att.Gonza

module.exports = productRouter;