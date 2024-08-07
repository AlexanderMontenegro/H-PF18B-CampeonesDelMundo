const {
    getProduct,
    searchTipo,
    getProductId,
    deleteId,
    updateStockController,
    softDeleteProduct,
    restoreProduct,
    updateProductController
    //createProduct
  } = require("../controllers/productControllers");
  
  const  createProduct  = require("../controllers/postCrontrolers");
  
  
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
      const { tipo, descripcion, precio, imagen, marca, pais, talles, categoria } = req.body;
      
      const newProduct = await createProduct(tipo, descripcion, precio, imagen, marca, pais, talles, categoria);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      if (error.message === 'El producto ya existe') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  const updateStockHandler = async (req, res) => {
    const { idProducto } = req.params;
    const talles = req.body;

    const updatedProduct = await updateStockController(idProducto, talles);

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
};

const softDeleteProductHandler = async (req, res) => {
  const { idProducto } = req.params;
  try {
    const result = await softDeleteProduct(idProducto);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restoreProductHandler = async (req, res) => {
  const { idProducto } = req.params;
  try {
    const result = await restoreProduct(idProducto);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  
  
  /*catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ error: error.message });
    } */

      const updateProductHandler = async (req, res) => {
        const product = req.body;
        const updatedProduct = await updateProductController(product);
    
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
    
        res.status(200).json(updatedProduct);
    };
  
  
  module.exports = {
    productGetHandler,
    getProductByIdHandler,
    deleteIdHandler,
    createProductHandler,
    updateStockHandler,
    softDeleteProductHandler,
    restoreProductHandler,
    updateProductHandler
  };