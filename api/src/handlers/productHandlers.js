const {
  getProduct,
  searchTipo,
  getProductId,
  deleteId,
  createProduct
} = require("../controllers/productControllers");

//el handle de todos los productos y tipos 
const productGetHandler = async (req, res) => {
  try {
    const { tipo } = req.query;
    const result = tipo ? await searchTipo(tipo) : await getProduct();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const producto = await getProductId(idProducto);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIdHandler = async (req, res) => {
  const { idProducto } = req.params;
  try {
    const productDelete = await deleteId(idProducto);
    if (typeof productDelete === "string") {
      return res.status(400).json(productDelete);
    } else {
      return res.status(200).json(productDelete);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProductHandler = async (req, res) => {
  try {
    const { tipo, descripcion, precio, imagen, marca, pais, talles, categoria } = req.body;
    
    const newProduct = await createProduct(tipo, descripcion, precio, imagen, marca, pais, talles, categoria);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  productGetHandler,
  getProductByIdHandler,
  deleteIdHandler,
  createProductHandler
};


