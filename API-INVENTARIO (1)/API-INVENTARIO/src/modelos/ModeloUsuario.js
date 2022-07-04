const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
//NOMBRE DEL MODELO Usuario
const Usuario = db.define(
    //indicar el nombre del MODELO
    'usuario',
    //DEFINIR LAS COLUMNAS QUE SON PARTE DE LA TABLA MYSQL BASE DE DATOS
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },
        login: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,

        },
        idempleado: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        contrasena: {
            type: DataTypes.STRING(250),
            allowNull: false,

        },
        accesototal: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,

        },
        habilitado: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,

        },
        pin: {
            type: DataTypes.STRING(4),
            allowNull: true,

        },
        fallidos: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        correo: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,
        },
        estado: {
            type: DataTypes.ENUM('BL', 'AC', 'IN'),
            allowNull: true,
            defaultValue: 'AC',
        }
    },

    {
        //opciones de configuracion NOMBRE DE LA TABLA
        tableName: 'usuarios',
        timestamps: false, //FECHA Y HORA DE CREACION Y DE MOFICIACION NO SE AGEREGRE
        hooks: {
            beforeCreate(usuario) {
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena = hash;
            },
            beforeUpdate(usuario) {
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena = hash;
            },
        }

    }
);
//METODO COMPARE CONTRASEÑA (con, com) CON = CONTRASEÑA NO ENCRIPTADA Y COM = CONTARSEÑA ENCRIPTADA
Usuario.prototype.VerificarConttrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};
module.exports = Usuario;