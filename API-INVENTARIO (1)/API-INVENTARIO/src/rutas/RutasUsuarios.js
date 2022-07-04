const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuarios = require('../controladores/controladorUsuarios');
const rutas = Router();
rutas.get('/listar', controladorUsuarios.Listar);


rutas.post('/guardar/',
    body('login1').notEmpty().withMessage('Debe escribir un Usuario').isLength({ min: 6 }).withMessage('Debe escribir un Usuario de 6 caracteres como minimo'),
    body('contrasena1').notEmpty().withMessage('Debe escribir la contraseña').isLength({ min: 6 }).withMessage('Debe escribir una contraseña de 6 caracteres'),
    body('accesototal1').notEmpty().withMessage('Debe escribir un Acceso Total'),
    body('habilitado1').notEmpty().withMessage('Debe escribir un Habilitado'),
    body('pin1').isLength({ min: 4 }, { max: 4 }).withMessage('Debe escribir un pin de 4 caracteres'),
    body('fallidos1').notEmpty().withMessage('Debe escribir un Fallido ').isInt().withMessage('No ingresar letras'),
    body('correo1').notEmpty().withMessage('Debe escribir un Correo Electrónico'),
    body('estado1').notEmpty().withMessage('Debe escribir un Enumerado (ACT, BL O INT)'),
    controladorUsuarios.GuardarPost);


rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),

    body('login1').notEmpty().withMessage('Debe escribir un Usuario').isLength({ min: 6 }).withMessage('Debe escribir un Usuario de 6 caracteres como minimo'),
    body('contrasena1').notEmpty().withMessage('Debe escribir la contraseña').isLength({ min: 6 }).withMessage('Debe escribir una contraseña de 6 caracteres'),
    body('accesototal1').notEmpty().withMessage('Debe escribir un Acceso Total'),
    body('habilitado1').notEmpty().withMessage('Debe escribir un Habilitado'),
    body('pin1').isLength({ min: 4 }, { max: 4 }).withMessage('Debe escribir un pin de 4 caracteres'),
    body('fallidos1').notEmpty().withMessage('Debe escribir un Fallido ').isInt().withMessage('No ingresar letras'),
    body('correo1').notEmpty().withMessage('Debe escribir un Correo Electrónico'),
    body('estado1').notEmpty().withMessage('Debe escribir un Enumerado (ACT, BL O INT)'),
    controladorUsuarios.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorUsuarios.Eliminar);

module.exports = rutas;