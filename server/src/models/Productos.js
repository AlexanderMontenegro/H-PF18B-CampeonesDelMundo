// models/Productos.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Productos = sequelize.define('Productos', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    talles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, { timestamps: false });

  // Definir la relación muchos a muchos
  Productos.associate = function(models) {
    Productos.belongsToMany(models.Categoria, {
      through: 'ProductoCategorias',
      as: 'categorias',
      foreignKey: 'productoId',
    });
  };

  return Productos;
};

