const { DataTypes } = require('sequelize'); //dataType maneja los tipos
const db = require('../configuraciones/db');
const InventarioFisico = db.define(
    'inventarios_fisico1', //nombre del modelo
    { //estos son datos de las tablas
        id_ifisico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, //definimos las columnas que son parte de las tablas

        productos_cod: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },

        inventarios_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        cantidad_actual: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        cantidad_sistema: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        costo: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        precio: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        fechahora: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        balance_existencia: {
            type: DataTypes.DOUBLE,
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


    },

    {
        tableName: 'inventarios_fisico', //nombre de la tabla
        timestamps: false,
    }
); //definir el modelo se pone el nombre que quiera

//exportar el modelo
module.exports = InventarioFisico;