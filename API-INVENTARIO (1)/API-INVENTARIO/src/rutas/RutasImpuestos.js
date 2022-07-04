const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorImpuestos = require('../controladores/controladorImpuestos');
const rutas = Router();

rutas.get('/', controladorImpuestos.InicioRutas);
rutas.get('/listar', controladorImpuestos.Listar);

rutas.post('/guardar/',
    body('nombre_imp01').notEmpty().withMessage('Debe escribir el Nombre del Impuesto').isString().withMessage('El Nombre del Impuesto debe de Ingresar Letras!!'),
    body('valor_imp01').notEmpty().withMessage('Debe escribir el Valor del Impuesto').isDecimal().withMessage('En el Valor del Impuesto, -Ingresar Decimales!!'),


    controladorImpuestos.GuardarPost);

rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),
    body('nombre_imp01').notEmpty().withMessage('Debe escribir el Nombre del Impuesto').isString().withMessage('El Nombre del Impuesto debe de Ingresar Letras!!'),
    body('valor_imp01').notEmpty().withMessage('Debe escribir el Valor del Impuesto').isDecimal().withMessage('En el Valor del Impuesto, -Ingresar Decimales!!'),
    controladorImpuestos.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorImpuestos.Eliminar);

module.exports = rutas;