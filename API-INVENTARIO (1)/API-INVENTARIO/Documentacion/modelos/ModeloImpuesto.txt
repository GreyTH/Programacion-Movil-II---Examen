const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Impuesto = db.define(
    //indicar el nombre del MODELO
    'impuesto',
    //DEFINIR LAS COLUMNAS QUE SON PARTE DE LA TABLA MYSQL BASE DE DATOS
    {
        id_impuesto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_imp: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        valor_imp: {
            type: DataTypes.DECIMAL(10.4),
            allowNull: true,
        }

    },

    {
        //opciones de ocnfiguracion NOMBRE DE LA TABLA
        tableName: 'impuestos',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
    }
);
module.exports = Impuesto;