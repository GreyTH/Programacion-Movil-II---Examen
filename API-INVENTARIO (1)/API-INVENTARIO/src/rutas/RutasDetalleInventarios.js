const { Router } = require('express');
const { body, query } = require('express-validator'); //validaciones
const ControladorDetalleInventarios = require('../controladores/ControladorDetalleInventarios');
const rutas = Router();

rutas.get('/', ControladorDetalleInventarios.InicioRutas);

rutas.get('/listar', ControladorDetalleInventarios.Listar);

rutas.post('/guardar',
    body('fisico').notEmpty().withMessage('Tiene que llenar el campo >Fisico<')
    .isFloat().withMessage('El campo >Fisico< tiene que ser un valor numerico'),
    body('Ultimo').notEmpty().withMessage('Tiene que llenar el campo >Ultimo<')
    .isFloat().withMessage('El campo >Ultimo< tiene que ser un valor numerico'),
    body('Ingreso').notEmpty().withMessage('Tiene que llenar el campo >Ingreso<')
    .isFloat().withMessage('El campo >Ingreso< tiene que ser un valor numerico'),
    body('Egreso').notEmpty().withMessage('Tiene que llenar el campo >Egreso<')
    .isFloat().withMessage('El campo >Egreso< tiene que ser un valor numerico'),
    body('Precio').notEmpty().withMessage('Tiene que llenar el campo >Precio<')
    .isFloat().withMessage('El campo >Precio< tiene que ser un valor numerico'),
    body('ProductosCodigo').notEmpty().withMessage('Tiene que llenar el campo >ProductosCodigo<'),
    body('InventarioId').notEmpty().withMessage('Tiene que llenar el campo >InventarioId<')
    .isInt().withMessage('El campo >InventarioId< tiene que ser un valor numerico'),
    ControladorDetalleInventarios.GuardarPost);

rutas.put('/modificar',
    query('id').notEmpty().withMessage('Ingrese el id del registro que quiere editar')
    .isInt().withMessage('El id debe de ser un número'),
    body('fisico').notEmpty().withMessage('Tiene que llenar el campo >Fisico<')
    .isFloat().withMessage('El campo >Fisico< tiene que ser un valor numerico'),
    body('Ultimo').notEmpty().withMessage('Tiene que llenar el campo >Ultimo<')
    .isFloat().withMessage('El campo >Ultimo< tiene que ser un valor numerico'),
    body('Ingreso').notEmpty().withMessage('Tiene que llenar el campo >Ingreso<')
    .isFloat().withMessage('El campo >Ingreso< tiene que ser un valor numerico'),
    body('Egreso').notEmpty().withMessage('Tiene que llenar el campo >Egreso<')
    .isFloat().withMessage('El campo >Egreso< tiene que ser un valor numerico'),
    body('Precio').notEmpty().withMessage('Tiene que llenar el campo >Precio<')
    .isFloat().withMessage('El campo >Precio< tiene que ser un valor numerico'),
    body('ProductosCodigo').notEmpty().withMessage('Tiene que llenar el campo >ProductosCodigo<'),
    body('InventarioId').notEmpty().withMessage('Tiene que llenar el campo >InventarioId<')
    .isInt().withMessage('El campo >InventarioId< tiene que ser un valor numerico'),
    ControladorDetalleInventarios.ModificarPut);

rutas.delete('/eliminar',
    query('Id').notEmpty().withMessage('Debe de indicar el Id del registro que desea eliminar')
    .isInt().withMessage('El id debe de ser un número'),
    ControladorDetalleInventarios.Eliminar);

module.exports = rutas;