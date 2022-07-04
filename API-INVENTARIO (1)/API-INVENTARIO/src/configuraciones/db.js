//LLAMAMOS LOS PAQUETES
/* 'nombre de la base de datos',
 'EL USUARIO DE LA BASE DE DATOS',
 'CONTRASEÑA DE LA BASE DATOS',*/
const sequelize = require('sequelize');
const db = new sequelize(

    'apimovil',
    'newuser',
    'Konoha%33',

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307,

    }

);

module.exports = db;