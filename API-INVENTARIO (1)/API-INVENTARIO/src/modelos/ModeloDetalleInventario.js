const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const DetalleInventario = db.define(

    'detalle',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Fisico:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        ultimo:{
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        ingreso:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        egreso:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        precio:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        actual:{
            type:DataTypes.DOUBLE,
            allowNull:true
        },
        balanceunidad:{
            type:DataTypes.DOUBLE,
            allowNull:true
        },
        balanceprecio:{
            type:DataTypes.DOUBLE,
            allowNull:true
        },
        productos_Codigo:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
        inventarios_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        tableName: 'detalle_inventarios',
        timestamps: false
    }

);
module.exports = DetalleInventario