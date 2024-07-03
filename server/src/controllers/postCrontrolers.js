
const { Productos, Categoria } = require("../db")

const createProduct = async (
  tipo,
  descripcion,
  precio,
  stock,
  imagen,
  marca,
  pais,
  talles,
  categoria // Esta es una cadena de texto con los nombres de las categorías, separadas por comas
) => {
  try {
    // Validar campos obligatorios
    if (!tipo || !descripcion || !precio || !imagen || !marca || !pais || !talles || !categoria) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Separa los nombres de las categorías en un array
    const categoriaNombres = categoria.split(", ").map(nombre => nombre.trim());

    // Buscar o crear las categorías en la base de datos
    const categoriaRecords = await Promise.all(
      categoriaNombres.map(async (nombre) => {
        const [categoriaRecord] = await Categoria.findOrCreate({
          where: { nombre },
        });
        return categoriaRecord;
      })
    );

    // Verificar si el producto ya existe
    const existingProduct = await Productos.findOne({
      where: { tipo, descripcion, precio, stock, imagen, marca, pais, talles },
    });
    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    // Crear el nuevo producto
    const newProduct = await Productos.create({
      tipo,
      descripcion,
      precio: parseFloat(precio), // Convertir a número decimal
      stock,
      imagen,
      marca,
      pais,
      talles,
    });

    // Asociar las categorías al nuevo producto
    await newProduct.addCategorias(categoriaRecords);

    // Devolver el producto creado con sus categorías
    const createdProduct = await Productos.findByPk(newProduct.id, {
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

    return createdProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = createProduct;
