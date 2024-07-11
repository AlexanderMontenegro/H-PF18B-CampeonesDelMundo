

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;


const sequelize = new Sequelize(process.env.DB_URL, {
   dialect: 'postgres',
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false,
     },
   },
 });

const basename = path.basename(__filename);

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
const { Productos, Categoria, User, Order, Carrito, Marca} = sequelize.models;

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

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};


