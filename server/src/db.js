require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {  DATABASE_UR, DB_USER1, DB_PASSWORD1, DB_HOST1, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/campeones`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);

/* const sequelize = new Sequelize(
   `postgres://${DB_USER1}:${DB_PASSWORD1}@${DB_HOST1}/campeones`,
   {
     logging: false, // set to console.log to see the raw SQL queries
     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   //   dialectOptions: {
   //     ssl: {
   //       require: true,
   //       rejectUnauthorized: false, // Puedes establecer esto en true si tienes un certificado SSL válido
   //     },
   //   },

   }
);  */
 
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

const { Productos, Categoria, User, Order, Carrito, Marca, Favorite, Review } = sequelize.models;

Productos.belongsToMany(Categoria, { through: "ProductoCategoria", as: "categorias" });
Categoria.belongsToMany(Productos, { through: "ProductoCategoria", as: "productos" });

Carrito.belongsToMany(Productos, { through: 'CarritoProducto', as: 'productos' });
Productos.belongsToMany(Carrito, { through: 'CarritoProducto', as: 'carritos' });

Carrito.hasOne(Order, { foreignKey: 'carrito_id' });
Order.belongsTo(Carrito, { foreignKey: 'carrito_id' });

Marca.hasMany(Productos, { foreignKey: 'marca_id' });
Productos.belongsTo(Marca, { foreignKey: 'marca_id' });

User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Productos.hasMany(Favorite, { foreignKey: 'productos_id', as: 'favorites' });
Favorite.belongsTo(Productos, { foreignKey: 'productos_id', as: 'producto' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Productos.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Productos, { foreignKey: 'product_id' });

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
