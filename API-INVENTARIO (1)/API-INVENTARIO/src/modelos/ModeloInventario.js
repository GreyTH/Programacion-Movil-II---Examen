const { DataTypes } = require('sequelize'); //dataType maneja los tipos
const db = require('../configuraciones/db');
const Inventario = db.define(
    'inventario', //nombre del modelo
    { //estos son datos de las tablas
        id_inventario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, //definimos las columnas que son parte de las tablas

        fechahora: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        faltante: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        sobrante: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        usuariosRegistro: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        estaciones: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },

    {
        tableName: 'inventarios', //nombre de la tabla
        timestamps: false,
    }
); //definir el modelo se pone el nombre que quiera

//exportar el modelo
module.exports = Inventario;