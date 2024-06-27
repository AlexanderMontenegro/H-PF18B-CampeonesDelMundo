const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('Productos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  return Producto;
};
