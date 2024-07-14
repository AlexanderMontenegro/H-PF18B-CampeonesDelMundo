

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {  DATABASE_UR,DB_USER1, DB_PASSWORD1, DB_HOST1 } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER1}:${DB_PASSWORD1}@${DB_HOST1}/campeones`,
   {
     logging: false, // set to console.log to see the raw SQL queries
     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   
     },
   
 );
const basename = path.basename(__filename);
/*  dialectOptions: {
       ssl: {
         require: true,
         rejectUnauthorized: false, // Puedes establecer esto en true si tienes un certificado SSL válido
       }, */
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
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

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Productos, Categoria, User, Order, Carrito, Marca, Favorite} = sequelize.models;

// Aca vendrian las relaciones
 Productos.belongsToMany(Categoria, { through: "ProductoCategoria", as: "categorias" });
Categoria.belongsToMany(Productos, { through: "ProductoCategoria", as: "productos" });

// Carrito y Producto: muchos a muchos
Carrito.belongsToMany(Productos, { through: 'CarritoProducto', as: 'productos' });
Productos.belongsToMany(Carrito, { through: 'CarritoProducto', as: 'carritos' });

// Carrito y Orden: uno a uno
Carrito.hasOne(Order, { foreignKey: 'carrito_id' });
Order.belongsTo(Carrito, { foreignKey: 'carrito_id' });

// Usuario y Orden: uno a uno
//User.hasOne(Order, { foreignKey: 'user_id' });
//Order.belongsTo(User, { foreignKey: 'user_id' });

// Marca y Producto: uno a muchos
Marca.hasMany(Productos, { foreignKey: 'marca_id' });
Productos.belongsTo(Marca, { foreignKey: 'marca_id' });

// Relaciones para Favorite
User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

Productos.hasMany(Favorite, { foreignKey: 'productos_id' });
Favorite.belongsTo(Productos, { foreignKey: 'productos_id' });


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};


