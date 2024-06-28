const axios = require('axios');
const { Op } = require('sequelize');
const { Productos, Categoria } = require("../db")

//PARA MANDAR LA MISMA INFORMACION QUE TIENE EL BDD
const cleanArray = (arr) => {
    const clean = arr.map((elem) => {
      return {
        id: elem.id,
        tipo: elem.tipo,
        descripcion: elem.descripcion,
        precio: elem.precio,
        imagen: elem.imagen,
        categoria: elem.categoria,
        marca: elem.marca,
        pais: elem.pais,
        talles: elem.talles,
        created: false,
      };
    });
    return clean;
  };

  //----------------------------------------------------------------

//buscar todos los drivers
const getProduct = async () => {
  
  const dataProductos = await Productos.findAll({
    include: [
      {
        model: Categoria,
        through: {
          attributes: [],
        },
      },
    ],
  });
  
  
    const productosBD = dataProductos.map(
      ({
        id,
        tipo,
        descripcion,
        precio,
        imagen,
        marca,
        pais,
        talles,
        Categoria,
      }) => {
        const categoria = Categoria.map((t) => t.name).join(", ");
        return {
            id,
            tipo,
            descripcion,
            precio,
            imagen,
            marca,
            pais,
            talles,
            categoria,
        };
      }
    );
    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
  
    const apiProduct = cleanArray(apiProductRaw);
    
    return [...productosBD, ...apiProduct];
  };

  //--------------------------------------------------------------

 //buscar por tipo
const searchTipo = async (tipo) => {
    const productTipo = await Productos.findAll({
      where: { tipo: { [Op.iLike]: tipo } },
      include: [
        {
          model: Categoria,
          through: {
            attributes: [],
          },
        },
      ],
    });
    const ProductBD = productTipo.map(
      ({
        id,
        tipo,
        descripcion,
        precio,
        imagen,
        marca,
        pais,
        talles,
        Categoria,
      }) => {
        const categoria = Categoria.map((t) => t.name).join(", ");
        return {
            id,
            tipo,
            descripcion,
            precio,
            imagen,
            marca,
            pais,
            talles,
            categoria,
        };
      }
    );
    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
  
    const apiProduct = cleanArray(apiProductRaw);
    const filterdApi = apiProduct.filter(
      (product) => product.tipo.toLowerCase() === tipo.toLowerCase()
    );
    if (!productTipo.length && !filterdApi.length) {
      return [];
    }
  
    return [...ProductBD, ...filterdApi];
  };
  
  //------------------------------------------------------------------------------

  //BUSCAR POR ID
const getProductId = async (idProducto) => {
  let producto;

  // Obtener producto desde la API y mapear los datos
  const apiProducto = (
    await axios.get(`http://localhost:5000/productos/${idProducto}`)
  ).data;

  producto = {
    id: apiProducto.id,
    tipo: apiProducto.tipo,
    descripcion: apiProducto.descripcion,
    precio: apiProducto.precio,
    imagen: apiProducto.imagen,
    marca: apiProducto.marca,
    pais: apiProducto.pais,
    talles: apiProducto.talles,
    categoria: apiProducto.categoria,
    created: false,
  };

  // Obtener producto desde la base de datos
  const dbProducto = await Productos.findByPk(idProducto, {
    include: [
      {
        model: Categoria,
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (dbProducto) {
    // Mapear los datos del producto y sus categorías
    const categorias = dbProducto.Categorias.map((t) => t.nombre).join(", ");
    producto = {
      id: dbProducto.id,
      tipo: dbProducto.tipo,
      descripcion: dbProducto.descripcion,
      precio: dbProducto.precio,
      imagen: dbProducto.imagen,
      marca: dbProducto.marca,
      pais: dbProducto.pais,
      talles: dbProducto.talles,
      categoria: categorias,
      created: false,
    };
  }

  return producto;
};

//------------------------------------------------------------------------------------------------------------

//Para eliminar
const deleteId = async (id) => {
    const productId = await Productos.destroy({ where: { id } });
    if (!productId) return { error: "producto inexistente!" };
    else {
      return { message: "Producto eliminado exitosamente" };
    }
  };

//--------------------------------------------------------------------------------------------------

const createProduct = async (
    tipo,
    descripcion,
    precio,
    imagen,
    marca,
    pais,
    talles,
    categoria // Esta es una cadena de texto con los nombres de las categorías, separadas por comas
  ) => {
   
  
    // Encuentra o crea el producto en la base de datos
    const [newProduct, created] = await Productos.findOrCreate({
      where: {
        tipo,
        descripcion,
        precio,
        imagen,
        marca,
        pais,
        talles,
      },
    });
  
    
  
    // Separa los nombres de las categorías en un array
    const categoriaNombres = categoria.split(", ");
  
    // Encuentra los registros de categorías en la base de datos
    const categoriaRecords = await Categoria.findAll({
      where: {
        nombre: categoriaNombres,
      },
    });
  
   
  
    // Asocia las categorías al producto
    await newProduct.addCategorias(categoriaRecords);
  
    return newProduct;
  };
  

module.exports = {
  getProduct,
  searchTipo,
  getProductId,
  deleteId,
  createProduct
};
