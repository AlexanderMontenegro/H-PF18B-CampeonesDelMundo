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
    console.log(error)
  }
};

const getProductByIdHandler = async (req, res) => {
  const { idProducto } = req.params;
  const origin = isNaN(idProducto) ? "bdd" : "api";

  try {
    const producto = await getProductId(idProducto, origin);
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { tipo, descripcion, precio, imagen, marca, pais, talles, categoria, stock } = req.body;

    const newProduct = await createProduct(tipo, descripcion, precio, imagen, marca, pais, talles, categoria, stock);

    // Mapea las categorías a una cadena de texto
     newProduct.Categoria.map(cat => cat.nombre).join(", ");

    // Crea la respuesta limpia
    const productResponse = {
      id: newProduct.id,
      tipo: newProduct.tipo,
      descripcion: newProduct.descripcion,
      precio: newProduct.precio,
      imagen: newProduct.imagen,
      marca: newProduct.marca,
      pais: newProduct.pais,
      talles: newProduct.talles,
      categoria: categoria,
      stock: newProduct.stock,
    };

    console.log(productResponse);
    res.status(201).json(productResponse);
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


