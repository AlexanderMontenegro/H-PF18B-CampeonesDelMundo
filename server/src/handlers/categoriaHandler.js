const { getCategorias } = require("../controllers/categoriaControllers");

const categoriaHandler = async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  categoriaHandler,
};
