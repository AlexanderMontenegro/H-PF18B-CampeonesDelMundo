const { Router } = require("express");
const { categoriaHandler, createCategoriaHandler, deleteCategoriaHandler } = require("../handlers/categoriaHandler");
//const { validateProduct } = require('../middlewares/validation');


const categoriaRouter = Router();

categoriaRouter.get("/", categoriaHandler);
categoriaRouter.post("/", createCategoriaHandler);
categoriaRouter.delete("/:id", deleteCategoriaHandler)


//Te faltò el update jajaj. gonzar

module.exports = categoriaRouter;
