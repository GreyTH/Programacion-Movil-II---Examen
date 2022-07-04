const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClientes = require('../controladores/controladorClientes');
const rutas = Router();
rutas.get('/listar', controladorClientes.Listar);


rutas.post('/guardar/',
    body('clientnombre1').notEmpty().withMessage('Debe escribir el Nombre del Empleado'),
    body('clientapellido1').notEmpty().withMessage('Debe escribir el Apellido del Empleado'),
    body('clienttelefono1').notEmpty().withMessage('Debe escribir el Telefono del Empleado'),
    body('clientemail1').notEmpty().withMessage('Debe escribir un Correo Electrónico'),
    body('clientimagen1').notEmpty().withMessage('Debe de Agregar Imagen'),
    body('clientstatus1').notEmpty().withMessage('Debe escribir un Enumerado (ACT O INT)'),

    controladorClientes.GuardarPost);


rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),

    body('clientnombre1').notEmpty().withMessage('Debe escribir el Nombre del Empleado'),
    body('clientapellido1').notEmpty().withMessage('Debe escribir el Apellido del Empleado'),
    body('clienttelefono1').notEmpty().withMessage('Debe escribir un Código de Empleado').isInt().withMessage('El código debe de ser Números'),
    body('clientemail1').notEmpty().withMessage('Debe escribir un Correo Electrónico'),
    body('clientimagen1').notEmpty().withMessage('Debe de Agregar Imagen'),
    body('clientstatus1').notEmpty().withMessage('Debe escribir un Enumerado (ACT O INT)'), controladorClientes.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorClientes.Eliminar);

module.exports = rutas;