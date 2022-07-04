const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Empleado = db.define(
    //indicar el nombre del MODELO
    'empleado',

    {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },
        identidad: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: true,

        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: true,

        },
        idcargo: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        fechaingreso: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        salario: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        nombreimagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        nombrecompleto: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
    },

    {

        tableName: 'empleados',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
    }
);
module.exports = Empleado;