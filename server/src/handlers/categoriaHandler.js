const { getCategorias, createCategoria, deleteCategoria } = require("../controllers/categoriaControllers");

const categoriaHandler = async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategoriaHandler = async (req, res) =>{
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre de la categoría es requerido" });
    }

    const { categoria, created } = await createCategoria(nombre);
    if (created) {
      res.status(201).json(categoria);
    } else {
      res.status(200).json({ message: "La categoría ya existe", categoria });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoriaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await deleteCategoria(id);
    res.status(200).json({ message: "Categoría borrada exitosamente", categoria });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  deleteCategoriaHandler,
  createCategoriaHandler,
  categoriaHandler,
};
