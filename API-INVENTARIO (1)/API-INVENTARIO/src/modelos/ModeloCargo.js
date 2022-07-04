const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');

//NOMBRE DEL MODELO CARGOS
const Cargo = db.define(
    //indicar el nombre del MODELO
    'cargo',
    //DEFINIR LAS COLUMNAS QUE SON PARTE DE LA TABLA MYSQL BASE DE DATOS
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,

        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,

        }

    },

    {
        //opciones de ocnfiguracion NOMBRE DE LA TABLA
        tableName: 'cargos',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
    }
);
module.exports = Cargo;