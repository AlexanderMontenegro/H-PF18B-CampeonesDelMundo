const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  // Definir la relación muchos a muchos
  
  Categoria.associate = function(models) {
    Categoria.belongsToMany(models.Productos, {
      through: 'ProductoCategorias',
      as: 'productos',
      foreignKey: 'categoriaId',
    });
  };
  return Categoria;
};