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

// Función para formatear productos obtenidos de la base de datos
const formatProductosBD = (productos) => {
  return productos.map(
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
};

const getProduct = async () => {
  try {
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

      return formatProductosBD(dataProductos);
    }

    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
    const apiProduct = cleanArray(apiProductRaw);

    await conn.transaction(async (t) => {
      await Promise.all(apiProduct.map(async (product) => {
        const idProducto = isNaN(product.id) ? product.id : convertirId(product.id);

        const existingProduct = await Productos.findOne({ where: { id: idProducto }, transaction: t });

        if (!existingProduct) {
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

    return formatProductosBD(dataProductos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

const searchTipo = async (tipo) => {
  try {
    const productTipo = await Productos.findAll({
      where: {
        tipo: { [Op.iLike]: tipo},
        id: { [Op.not]: null },
      },
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

    const ProductBD = formatProductosBD(productTipo);

    const apiProductRaw = (await axios.get("http://localhost:5000/productos")).data;
    const apiProduct = cleanArray(apiProductRaw);
    
    const filterdApi = apiProduct
      .filter(
        (product) => product.tipo.toLowerCase() === tipo.toLowerCase()
      )
      .filter((product) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(product.id));

    if (!productTipo.length && !filterdApi.length) {
      return [];
    }

    return [...ProductBD, ...filterdApi];
  } catch (error) {
    console.error("Error al buscar productos por tipo:", error);
    throw error;
  }
};

const getProductId = async (idProducto, origin) => {
  try {
    let producto;
  
    if (origin === "api") {
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
      const dbProducto = await Productos.findByPk(idProducto, {
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
  
      if (!dbProducto) {
        throw new Error("Producto no encontrado");
      }
  
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

const deleteId = async (id) => {
  try {
    const productId = await Productos.destroy({ where: { id } });
    if (!productId) return { error: "producto inexistente!" };
    return { message: "Producto eliminado exitosamente" };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

const updateStockController = async (idProducto, talles) => {
  try {
    const producto = await Productos.findByPk(idProducto);
    if (!producto) {
      return null;
    }
    await producto.update({ talles: talles });
    return producto;
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    throw error;
  }
};

module.exports = {
  getProduct,
  searchTipo,
  getProductId,
  deleteId,
  updateStockController
};
