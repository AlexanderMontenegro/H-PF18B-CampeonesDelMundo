const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Productos, Categoria, conn } = require("../db");

// Función para limpiar el array de productos
const cleanArray = (arr) => {
  return arr.map((elem) => ({
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
  }));
};

const convertirId = (idInteger) => {
  return uuidv4();
};

const getProduct = async () => {
  try {
    // Verificar si hay productos en la base de datos
    const existingProducts = await Productos.count();
    if (existingProducts > 0) {
      const dataProductos = await Productos.findAll({
        include: [
          {
            model: Categoria,
            as: 'categorias',
            through: {
              attributes: [],
            },
          },
        ],
      });

      // Formatear los productos obtenidos de la base de datos
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
          categorias,
        }) => {
          const categoria = categorias ? categorias.map((t) => t.nombre).join(", ") : "";
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

      return productosBD;
    }

    // Obtener productos de la API local
    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
    const apiProduct = cleanArray(apiProductRaw);

    // Usar una transacción para insertar los productos
    await conn.transaction(async (t) => {
      await Promise.all(apiProduct.map(async (product) => {
        const idProducto = isNaN(product.id) ? product.id : convertirId(product.id);

        // Verificar si el producto ya existe en la base de datos
        const existingProduct = await Productos.findOne({ where: { id: idProducto }, transaction: t });

        if (!existingProduct) {
          // Crear el producto solo si no existe
          const producto = await Productos.create({
            id: idProducto,
            tipo: product.tipo,
            descripcion: product.descripcion,
            precio: product.precio,
            imagen: product.imagen,
            marca: product.marca,
            pais: product.pais,
            talles: product.talles,
          }, { transaction: t });

          const categoriaNombres = product.categoria.split(", ").map(nombre => nombre.trim());

          const categoriaRecords = await Categoria.findAll({
            where: {
              nombre: categoriaNombres
            },
            transaction: t
          });

          if (categoriaRecords.length > 0) {
            await producto.addCategorias(categoriaRecords, { transaction: t });
          }
        }
      }));
    });

    // Obtener todos los productos de la base de datos, incluyendo sus categorías
    const dataProductos = await Productos.findAll({
      include: [
        {
          model: Categoria,
          as: 'categorias',
          through: {
            attributes: [],
          },
        },
      ],
    });

    // Formatear los productos obtenidos de la base de datos
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
        categorias,
      }) => {
        const categoria = categorias ? categorias.map((t) => t.nombre).join(", ") : "";
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

    return productosBD;
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
    // Buscar productos en la base de datos con UUID
    const productTipo = await Productos.findAll({
      where: {
        tipo: { [Op.iLike]: tipo },
        id: { [Op.not]: null }, // Asegura que solo se devuelvan productos con ID (UUID)
      },
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

    // Obtener productos de la API externa
    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
    const apiProduct = cleanArray(apiProductRaw);
    
    // Filtrar productos de la API por tipo y asegurarse de que tengan UUID
    const filterdApi = apiProduct
      .filter(
        (product) => product.tipo.toLowerCase() === tipo.toLowerCase()
      )
      .filter((product) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(product.id)); // Filtra productos con UUID válido

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

//-----------------------------------------------------------------------------------------------------------------------

//modifica el stock
  const updateStockController = async (idProducto, talles) => {
  const producto = await Productos.findByPk(idProducto);

  if (!producto) {
      return null; // Si el producto no se encuentra, retorna null
  }

/*   const updatedTalles = producto.talles.map(item => 
      item.talle === talle ? { ...item, stock } : item
  ); */

  await producto.update({ talles: talles });
  return producto;
};



module.exports = {
  getProduct,
  searchTipo,
  getProductId,
  deleteId,
  updateStockController
}  