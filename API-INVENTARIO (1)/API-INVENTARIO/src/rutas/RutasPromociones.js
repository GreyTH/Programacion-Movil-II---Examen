const { Router } = require('express');
const { body, query } = require('express-validator'); //validaciones
const ControladorPromociones = require('../controladores/ControladorPromociones');
const rutas = Router();

rutas.get('/', ControladorPromociones.InicioRutas);

rutas.get('/listar', ControladorPromociones.Listar);

rutas.post('/guardar',
    body('ProductosCodigo').notEmpty().withMessage('Debe de llenar el campo >Productos Codigo<'),
    //body('Inicio').notEmpty().withMessage('Debe de llenar el campo >Inicio<'),
    body('Fin').notEmpty().withMessage('Debe de llenar el campo >Fin<'),
    ControladorPromociones.GuardarPost);

rutas.put('/modificar',
    query('id').notEmpty().withMessage('Ingrese el Id del registro que desea modificar')
    .isInt().withMessage('El campo >Id< debe de ser numerico'),
    body('ProductosCodigo').notEmpty().withMessage('Debe de llenar el campo >Productos Codigo<'),
    body('Inicio').notEmpty().withMessage('Debe de llenar el campo >Inicio<'),
    body('Fin').notEmpty().withMessage('Debe de llenar el campo >Fin<'),
    ControladorPromociones.ModificarPut);

rutas.delete('/eliminar',
    query('Id').notEmpty().withMessage('Debe llenar el campo >Id<')
    .isInt().withMessage('El campo >Id< debe de ser numerico'),
    ControladorPromociones.Eliminar);

module.exports = rutas;