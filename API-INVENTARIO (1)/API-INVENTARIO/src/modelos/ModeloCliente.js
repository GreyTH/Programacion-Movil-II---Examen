const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Cliente = db.define(
    //indicar el nombre del MODELO
    'cliente',

    {
        clientid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        clientnombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        clientapellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        clienttelefono: {
            type: DataTypes.STRING(250),
            allowNull: false,

        },
        clientemail: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        clientimagen: {
            type: DataTypes.STRING(250),
            allowNull: true,

        },
        clientstatus: {
            type: DataTypes.ENUM('ACT', 'INT'),
            allowNull: true,
            defaultValue: 'ACT'
        }

    },

    {
        //opciones de ocnfiguracion NOMBRE DE LA TABLA
        tableName: 'clientes',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
    }
);
module.exports = Cliente;