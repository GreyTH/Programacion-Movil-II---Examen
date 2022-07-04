const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCargos = require('../controladores/controladorCargos');
const rutas = Router();
rutas.get('/listar', controladorCargos.Listar);

rutas.post('/guardar/',
    body('nombre').notEmpty().withMessage('Debe escribir del Nombre del Cargo').isLength({ min: 3 }).withMessage('Debe escribir un nombre de 3 caracteres como minimo'),
    controladorCargos.GuardarPost);

rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),
    body('nombre').notEmpty().withMessage('Debe escribir del Nombre del Cargo').isLength({ min: 3 }).withMessage('Debe escribir un nombre de 3 caracteres como minimo'),
    controladorCargos.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorCargos.Eliminar);

module.exports = rutas;