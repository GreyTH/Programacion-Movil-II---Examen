const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Producto = db.define(

    'producto',


    {
        codigoProduct1: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombreProduct1: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        descripcionProduct1: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        TipoProduct1: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        existencia1: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        precio1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        costo1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        cantidadminima1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        exento1: {
            type: DataTypes.TINYINT,
            allowNull: true,

        },

        habilitado1: {
            type: DataTypes.TINYINT,
            allowNull: true,

        },
        tipo2: {
            type: DataTypes.ENUM('GE', 'EL', 'PR', 'AL'),
            allowNull: true,
            defaultValue: 'GE'
        },
        orden1: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        impuestov1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        impuestovalor1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        ultimo1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },
        nombreimagen1: {
            type: DataTypes.STRING(250),
            allowNull: true,

        },
        idprincipal1: {
            type: DataTypes.STRING(15),
            allowNull: true,

        },
        cantidadPrincial1: {
            type: DataTypes.DOUBLE,
            allowNull: true,

        },

        idUsuario1: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        movimiento1: {
            type: DataTypes.STRING(45),
            allowNull: true,

        }

    },

    {

        tableName: 'productos',
        timestamps: false,
    }
);
module.exports = Producto;