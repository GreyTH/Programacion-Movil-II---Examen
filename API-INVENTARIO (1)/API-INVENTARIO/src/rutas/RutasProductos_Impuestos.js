const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProductos_Impuestos = require('../controladores/controladorProductos_Impuestos');
const rutas = Router();

rutas.get('/', controladorProductos_Impuestos.InicioRutas);

rutas.get('/listar', controladorProductos_Impuestos.Listar);
//idproducto01, idimpuesto01
rutas.post('/guardar/',
    body('idimpuesto01').notEmpty().withMessage('Debe escribir el ID del Impuesto').isInt().withMessage('El código Impuesto, debe de ser Números y que Exista!!'),
    body('idproducto01').notEmpty().withMessage('Debe escribir el código de Tipo Producto ').isInt().withMessage('El código Producto, debe de ser Números y que Exista!!'),

    controladorProductos_Impuestos.GuardarPost);

module.exports = rutas;