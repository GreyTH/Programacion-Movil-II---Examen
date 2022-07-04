const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorTipoProductos = require('../controladores/controladorTipoProductos');
const rutas = Router();
rutas.get('/', controladorTipoProductos.InicioRutas);

rutas.get('/listar', controladorTipoProductos.Listar);

rutas.post('/guardar/',
    body('Nombre01').notEmpty().withMessage('Debe escribir el Nombre del Tipo Producto').isString().withMessage('El Nombre del Tipo Producto debe de Ingresar Letras!!'),
    body('Descripcion_Tipo01').notEmpty().withMessage('Debe escribir el Descripcion del Tipo Producto').isString().withMessage('descripcion del Tipo Producto, Ingresar Letras!!'),
    body('Orden01').notEmpty().withMessage('Debe escribir la Orden del Tipo Producto').isInt().withMessage('En el Orden, -Ingresar Numeros!!'),
    body('Id_Tipo_Pricipal01').notEmpty().withMessage('Debe escribir un Código de Tipo Principal').isInt().withMessage('El id Tipo principal01 debe de ser Números'),
    body('Nombre_Imagen01').notEmpty().withMessage('Debe escribir el Nombre de la Imagen del Producto').isString().withMessage('El Nombre de la Imagen debe de Ingresar Letras!!'),

    controladorTipoProductos.GuardarPost);

rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),
    body('Nombre01').notEmpty().withMessage('Debe escribir el Nombre del Tipo Producto').isString().withMessage('El Nombre del Tipo Producto debe de Ingresar Letras!!'),
    body('Descripcion_Tipo01').notEmpty().withMessage('Debe escribir el Descripcion del Tipo Producto').isString().withMessage('descripcion del Tipo Producto, Ingresar Letras!!'),
    body('Orden01').notEmpty().withMessage('Debe escribir la Orden del Tipo Producto').isInt().withMessage('En el Orden, -Ingresar Numeros!!'),
    body('Id_Tipo_Pricipal01').notEmpty().withMessage('Debe escribir un Código de Tipo Principal').isInt().withMessage('El id Tipo principal01 debe de ser Números'),
    body('Nombre_Imagen01').notEmpty().withMessage('Debe escribir el Nombre de la Imagen del Producto').isString().withMessage('El Nombre de la Imagen debe de Ingresar Letras!!'),
    controladorTipoProductos.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del Producto')
    .isInt().withMessage('El id del Producto debe ser un numero entero'),
    controladorTipoProductos.Eliminar);

module.exports = rutas;