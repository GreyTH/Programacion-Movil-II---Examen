const { DataTypes } = require('sequelize'); //dataType maneja los tipos
const db = require('../configuraciones/db');
const Tproducto = db.define(
    'tipoproducto', //nombre del modelo
    { //estos son datos de las tablas
        codigo_Tipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        Nombre_Tipo: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        Descripcion_Tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        Orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        Id_Tipo_Principal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        Nombre_Imagen: {
            type: DataTypes.STRING(250),
            allowNull: false,
        }
    },

    {
        tableName: 'TipoProducto', //nombre de la tabla
        timestamps: false,
    }
);

//exportar el modelo
module.exports = Tproducto;