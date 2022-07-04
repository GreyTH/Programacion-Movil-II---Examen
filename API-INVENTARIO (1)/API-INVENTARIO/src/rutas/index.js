const { Router } = require('express');
const { body, validationResult, query } = require('express-validator');
const controladorInicial = require('../controladores/controladorInicial');
const rutas = Router();
rutas.get('/', controladorInicial.Inicio);

rutas.post('/guardar/',
    //body('usuario').isLength({min: 3}).withMessage('Debe escribir el nombre del usuario'),
    body('contraseña').notEmpty().withMessage('Debe escribir la contraseña').isLength({ min: 6 }).withMessage('Debe escribir una contraseña de 6 caracteres'),
    body('usuario').notEmpty().withMessage('Debe escribir el nombre del usuario').isLength({ min: 3 }).withMessage('Debe escribir un nombre de usuariode 3 caracteres como minimo'),
    controladorInicial.EjemploPost);
module.exports = rutas;

rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    body('contraseña')
    .notEmpty().withMessage('Debe escribir la contraseña')
    .isLength({ min: 6 }).withMessage('Debe escribir una contraseña de 6 caracteres'),
    body('usuario').notEmpty().withMessage('Debe escribir el nombre del usuario')
    .isLength({ min: 3 }).withMessage('Debe escribir un nombre de usuariode 3 caracteres como minimo'),
    controladorInicial.EjemploPut);

rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorInicial.EjemploDelete);

module.exports = rutas;