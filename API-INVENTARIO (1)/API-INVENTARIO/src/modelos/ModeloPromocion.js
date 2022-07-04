const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Promocion = db.define(
    'promocion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productos_Codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inicio: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        creado: {
            type: DataTypes.DATE,
            allowNull: true
        },
        modificado: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: "promociones",
        timestamps: false
    }
);
module.exports = Promocion