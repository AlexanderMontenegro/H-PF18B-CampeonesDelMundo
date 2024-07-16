require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER_L, DB_PASSWORD_L, DB_HOST_L, DB_PORT_L, DB_NAME_L } = process.env;

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
   `postgres://${DB_USER_L}:${DB_PASSWORD_L}@${DB_HOST_L}:${DB_PORT_L}/${DB_NAME_L}`,
   {
      logging: false,
      native: false,
      dialectOptions: isProduction ? {
         ssl: {
            require: true,
            rejectUnauthorized: false,
         }
      } : {}
   }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Productos, Categoria, User, Order, Carrito, Marca, Favorite } = sequelize.models;

Productos.belongsToMany(Categoria, { through: "ProductoCategoria", as: "categorias" });
Categoria.belongsToMany(Productos, { through: "ProductoCategoria", as: "productos" });

Carrito.belongsToMany(Productos, { through: 'CarritoProducto', as: 'productos' });
Productos.belongsToMany(Carrito, { through: 'CarritoProducto', as: 'carritos' });

Carrito.hasOne(Order, { foreignKey: 'carrito_id' });
Order.belongsTo(Carrito, { foreignKey: 'carrito_id' });

Marca.hasMany(Productos, { foreignKey: 'marca_id' });
Productos.belongsTo(Marca, { foreignKey: 'marca_id' });

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

Productos.hasMany(Favorite, { foreignKey: 'productos_id' });
Favorite.belongsTo(Productos, { foreignKey: 'productos_id' });

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
