const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const rutas = Router();
rutas.get('/listar', controladorEmpleados.Listar);


rutas.post('/guardar/',

    controladorEmpleados.GuardarPost);


rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo'),
    controladorEmpleados.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorEmpleados.Eliminar);

module.exports = rutas;