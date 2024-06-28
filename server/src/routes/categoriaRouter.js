const { Router } = require("express");
const { categoriaHandler } = require("../handlers/categoriaHandler");

const categoriaRouter = Router();

categoriaRouter.get("/", categoriaHandler);

module.exports = categoriaRouter;
