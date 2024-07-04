const axios = require('axios');
const { Op } = require('sequelize');
const { Productos, Categoria } = require("../db")

//PARA MANDAR LA MISMA INFORMACION QUE TIENE EL BDD
//* Función para limpiar el array de productos
const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    return {
      id: elem.id,
      tipo: elem.tipo,
      descripcion: elem.descripcion,
      precio: elem.precio,
      stock: elem.stock,
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

//* Controlador para obtener todos los productos
const getProduct = async () => {
  try {
    const dataProductos = await Productos.findAll({
      include: [
        {
          model: Categoria,
          as: 'categorias', // Asegúrate de usar el alias correcto
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
        stock,
        imagen,
        marca,
        pais,
        talles,
        categorias, // Usa el alias correcto
      }) => {
        //* Verifica si 'categorias' está definido y mapea los nombres
        const categoria = categorias ? categorias.map((t) => t.nombre).join(", ") : "";
        return {
          id,
          tipo,
          descripcion,
          precio,
          stock,
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
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
  //--------------------------------------------------------------

 //buscar por tipo
//* Controlador para buscar productos por tipo
const searchTipo = async (tipo) => {
  try {
    const productTipo = await Productos.findAll({
      where: { tipo: { [Op.iLike]: tipo } },
      include: [
        {
          model: Categoria,
          as: 'categorias', // Usa el alias correcto
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
        stock,
        imagen,
        marca,
        pais,
        talles,
        categorias, // Usa el alias correcto
      }) => {
        //* Verifica si 'categorias' está definido y mapea los nombres
        const categoria = categorias ? categorias.map((t) => t.nombre).join(", ") : "";
        return {
          id,
          tipo,
          descripcion,
          precio,
          stock,
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
  } catch (error) {
    console.error("Error al buscar productos por tipo:", error);
    throw error;
  }
};
  
  //------------------------------------------------------------------------------

  //BUSCAR POR ID
 
  const getProductId = async (idProducto, origin) => {
    try {
      let producto;
  
      if (origin === "api") {
        //* Obtener producto desde la API
        const apiProducto = (
          await axios.get(`http://localhost:5000/productos/${idProducto}`)
        ).data;
  
        producto = {
          id: apiProducto.id,
          tipo: apiProducto.tipo,
          descripcion: apiProducto.descripcion,
          precio: apiProducto.precio,
          stock: apiProducto.stock,
          imagen: apiProducto.imagen,
          marca: apiProducto.marca,
          pais: apiProducto.pais,
          talles: apiProducto.talles,
          categoria: apiProducto.categoria,
          created: false,
        };
      } else {
        //* Obtener producto desde la base de datos
        const dbProducto = await Productos.findByPk(idProducto, {
          include: [
            {
              model: Categoria,
              as: 'categorias', // Usa el alias correcto
              through: {
                attributes: [],
              },
            },
          ],
        });
  
        if (!dbProducto) {
          throw new Error("Producto no encontrado");
        }
  
        //* Verifica si 'categorias' está definido y mapea los nombres
        const categorias = dbProducto.categorias ? dbProducto.categorias.map((t) => t.nombre).join(", ") : '';
        producto = {
          id: dbProducto.id,
          tipo: dbProducto.tipo,
          descripcion: dbProducto.descripcion,
          precio: dbProducto.precio,
          stock: dbProducto.stock,
          imagen: dbProducto.imagen,
          marca: dbProducto.marca,
          pais: dbProducto.pais,
          talles: dbProducto.talles,
          categoria: categorias,
          created: false,
        };
      }
  
      return producto;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      throw error;
    }
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
/*
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
  
    if (!created) {  //todo....para que valide si el producto existe.
      throw new Error('El producto ya existe');
    }
  
    // Separa los nombres de las categorías en un array
    const categoriaNombres = categoria.split(", ");
  
    // Encuentra los registros de categorías en la base de datos
    const categoriaRecords = await Categoria.findAll({
      where: {
        nombre: categoriaNombres,
      },
    });
  
   
  
    // Asocia las categorías al producto
    await newProduct.addCategoria(categoriaRecords);
  
    return newProduct;
  };
 */ 

module.exports = {
  getProduct,
  searchTipo,
  getProductId,
  deleteId,
}  