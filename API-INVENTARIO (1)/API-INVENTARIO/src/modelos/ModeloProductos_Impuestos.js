const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');

//NOMBRE DEL MODELO 
const Productos_Impuestos = db.define(
    //indicar el nombre del MODELO
    'Productos_impuestos',
    //DEFINIR LAS COLUMNAS QUE SON PARTE DE LA TABLA MYSQL BASE DE DATOS
    {
        idproducto: {
            type: DataTypes.STRING(128),
            primaryKey: true,
            allowNull: false,
        },
        idimpuesto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

    },

    {
        //opciones de ocnfiguracion NOMBRE DE LA TABLA
        tableName: 'productos_impuestos',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
    }
);
module.exports = Productos_Impuestos;