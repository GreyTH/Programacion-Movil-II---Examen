const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProductos = require('../controladores/controladorProductos');
const rutas = Router();

rutas.get('/', controladorProductos.InicioRutas);

rutas.get('/listar', controladorProductos.Listar);

rutas.post('/guardar/',
    body('id').notEmpty().withMessage('Debe escribir el código del Producto ').withMessage('El código Producto, debe de ser Números !!'),
    body('nombreProduct01').notEmpty().withMessage('Debe escribir el Nombre del Producto').isString().withMessage('El Nombre del Producto debe de Ingresar Letras!!'),
    body('descripcionProduct01').notEmpty().withMessage('Debe escribir el Descripcion del Producto').isString().withMessage('descripcion del Producto, Ingresar Letras!!'),
    body('TipoProduct01').notEmpty().withMessage('Debe escribir el código de Tipo Producto ').isInt().withMessage('El código Tipo Producto, debe de ser Números y que Exista!!'),
    body('existencia01').notEmpty().withMessage('Debe escribir la Existencia del Producto').isInt().withMessage('En la Existencia, No Ingresar Letras!!'),
    body('precio01').notEmpty().withMessage('Debe escribir el Precio del Producto').isFloat().withMessage('Precio, No Ingresar Letras!!'),
    body('costo01').notEmpty().withMessage('Debe escribir la Costo del Producto').isFloat().withMessage('En el Costo, Ingresar Numeros!!'),
    body('cantidadminima01').notEmpty().withMessage('Debe escribir la Cantidad Miníma del Producto').isInt().withMessage('Cantidad Miníma, -No Ingresar Letras!!'),
    body('exento01').notEmpty().withMessage('Debe escribir el Exento del Producto').isFloat().withMessage('En el Exento, Ingresar Numeros!!'),
    body('habilitado01').notEmpty().withMessage('Debe escribir el Habilitado del Producto').isInt().withMessage('En el Habilitado, -No Ingresar Letras!!'),
    body('tipo201').notEmpty().withMessage('Debe escribir el Tipo2 del Producto GE, EL, PR, AL').isString().withMessage('En el Tipo2, Ingresar Solamente GE, EL, PR, AL !!'),
    body('orden01').notEmpty().withMessage('Debe escribir la Orden del Producto').isInt().withMessage('En el Orden, -Ingresar Numeros!!'),
    body('impuestov01').notEmpty().withMessage('Debe escribir el Impuestov1 del Producto').isFloat().withMessage('En el Impuestov1, -Ingresar Decimales!!'),
    body('impuestovalor01').notEmpty().withMessage('Debe escribir el Impuesto Valor del Producto').isFloat().withMessage('En el Impuesto Valor, -No Ingresar Letras!!'),
    body('ultimo01').notEmpty().withMessage('Debe escribir ultimo del Producto').isInt().withMessage('En el ultimo, No Ingresar Letras!!'),
    body('nombreimagen01').notEmpty().withMessage('Debe escribir el Nombre de la Imagen del Producto').isString().withMessage('El Nombre de la Imagen debe de Ingresar Letras!!'),
    body('idprincipal01').notEmpty().withMessage('Debe escribir un Código de Principal').isInt().withMessage('El idprincipal01 debe de ser Números'),
    body('cantidadPrincipal01').notEmpty().withMessage('Debe escribir la Cantidad Principal del Producto').isFloat().withMessage('La Cantidad Principal debe de ser Números'),
    body('idUsuario01').notEmpty().withMessage('Debe escribir un idUsuario ').isInt().withMessage('En el idUsuario01..No ingresar letras!!'),
    body('movimiento01').notEmpty().withMessage('Debe escribir Movimineto del Producto').withMessage('En el movimiento..No Ingresar Letras!!'),
    controladorProductos.GuardarPost);

rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Producto').isInt().withMessage('El ID del Producto debe ser Números Entero'),
    body('nombreProduct01').notEmpty().withMessage('Debe escribir el Nombre del Producto').isString().withMessage('El Nombre del Producto, debe de Ingresar solo Letras!!'),
    body('descripcionProduct01').notEmpty().withMessage('Debe escribir el Descripcion del Producto').isString().withMessage('descripcion del Producto, debe de Ingresar solo Letras!!'),
    body('TipoProduct01').notEmpty().withMessage('Debe escribir el código de Tipo Producto ').isInt().withMessage('El código Tipo Producto, debe de ser Números y que Exista!!'),
    body('existencia01').notEmpty().withMessage('Debe escribir la Existencia del Producto').isInt().withMessage('En la Existencia, No Ingresar Letras!!'),
    body('precio01').notEmpty().withMessage('Debe escribir el Precio del Producto').isFloat().withMessage('Precio, No Ingresar Letras!!'),
    body('costo01').notEmpty().withMessage('Debe escribir la Costo del Producto').isFloat().withMessage('En el Costo, Ingresar Numeros!!'),
    body('cantidadminima01').notEmpty().withMessage('Debe escribir la Cantidad Miníma del Producto').isInt().withMessage('Cantidad Miníma, -No Ingresar Letras!!'),
    body('exento01').notEmpty().withMessage('Debe escribir el Exento del Producto').isFloat().withMessage('En el Exento, Ingresar Numeros!!'),
    body('habilitado01').notEmpty().withMessage('Debe escribir el Habilitado del Producto').isInt().withMessage('En el Habilitado, -No Ingresar Letras!!'),
    body('tipo201').notEmpty().withMessage('Debe escribir el Tipo2 del Producto Ingresar una opción entre GE, EL, PR, AL').isString().withMessage('En el Tipo2, Ingresar una opción entre GE, EL, PR, AL!!'),
    body('orden01').notEmpty().withMessage('Debe escribir la Orden del Producto').isInt().withMessage('En el Orden, -Ingresar Numeros!!'),
    body('impuestov01').notEmpty().withMessage('Debe escribir el Impuestov1 del Producto').isFloat().withMessage('En el Impuestov1, -Ingresar Decimales!!'),
    body('impuestovalor01').notEmpty().withMessage('Debe escribir el Impuesto Valor del Producto').isFloat().withMessage('En el Impuesto Valor, -No Ingresar Letras!!'),
    body('ultimo01').notEmpty().withMessage('Debe escribir ultimo del Producto').isInt().withMessage('En el ultimo, No Ingresar Letras!!'),
    body('nombreimagen01').notEmpty().withMessage('Debe escribir el Nombre de la Imagen del Producto').isString().withMessage('El Nombre de la Imagen debe de Ingresar Letras!!'),
    body('idprincipal01').notEmpty().withMessage('Debe escribir un Código de Principal').isInt().withMessage('El idprincipal01 debe de ser Números'),
    body('cantidadPrincipal01').notEmpty().withMessage('Debe escribir la Cantidad Principal del Producto').isFloat().withMessage('La Cantidad Principal debe de ser Números'),
    body('idUsuario01').notEmpty().withMessage('Debe escribir un idUsuario ').isInt().withMessage('En el idUsuario01..No ingresar letras!!'),
    body('movimiento01').notEmpty().withMessage('Debe escribir Movimineto del Producto').withMessage('En el movimiento..No Ingresar Letras!!'),
    controladorProductos.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del Producto')
    .isInt().withMessage('El id del Producto debe ser un numero entero'),
    controladorProductos.Eliminar);

module.exports = rutas;