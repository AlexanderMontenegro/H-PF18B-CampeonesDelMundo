const { Router } = require("express");
const { categoriaHandler, createCategoriaHandler, deleteCategoriaHandler } = require("../handlers/categoriaHandler");


const categoriaRouter = Router();

categoriaRouter.get("/", categoriaHandler);
categoriaRouter.post("/", createCategoriaHandler);
categoriaRouter.delete("/:id", deleteCategoriaHandler)

module.exports = categoriaRouter;
