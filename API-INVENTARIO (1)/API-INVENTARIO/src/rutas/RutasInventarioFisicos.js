const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInventariosFisico = require('../controladores/ControladorInventarioFisicos');
const rutas = Router();

rutas.get('/', controladorInventariosFisico.InicioRutas);

rutas.get('/listar', controladorInventariosFisico.Listar);


rutas.post('/guardar/',
    body('productos_cod01').notEmpty().withMessage('Debe escribir el codigo del producto').isInt().withMessage('El código Producto, debe de ser Números y que Exista!!'),
    body('inventarios_id01').notEmpty().withMessage('Debe escribir el id del inventario').isInt().withMessage('El código inventario, debe de ser Números y que Exista!!'),
    body('cantidad_actual01').notEmpty().withMessage('Debe escribir la cantidad actual del inventario').isFloat().withMessage('En cantidad actual , Ingresar Números!!'),
    body('cantidad_sistema01').notEmpty().withMessage('Debe escribir la cantidad de sistema del inventario').isFloat().withMessage('En cantidad de sistema, Ingresar Números!!'),
    body('costo01').notEmpty().withMessage('Debe escribir el costo del inventario').isFloat().withMessage('En costo, No Ingresar Letras!!'),
    body('precio01').notEmpty().withMessage('Debe escribir el precio del inventario').isFloat().withMessage('En precio, No Ingresar Letras!!'),
    body('fechahora01').notEmpty().withMessage('Debe escribir la fecha y hora del inventario'),
    body('balance_existencia01').notEmpty().withMessage('Debe escribir el balance de existencia del inventario').isFloat().withMessage('En balance, No Ingresar Letras!!'),
    body('faltante01').notEmpty().withMessage('Debe escribir el faltante del inventario').isFloat().withMessage('En faltante, No Ingresar Letras!!'),
    body('sobrante01').notEmpty().withMessage('Debe escribir el sobrante del inventario').isFloat().withMessage('En sobrante, No Ingresar Letras!!'),

    controladorInventariosFisico.GuardarPost);


rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),

    body('productos_cod01').notEmpty().withMessage('Debe escribir el codigo del producto').isInt().withMessage('El código Producto, debe de ser Números y que Exista!!'),
    body('inventarios_id01').notEmpty().withMessage('Debe escribir el id del inventario').isInt().withMessage('El código inventario, debe de ser Números y que Exista!!'),
    body('cantidad_actual01').notEmpty().withMessage('Debe escribir la cantidad actual del inventario').isFloat().withMessage('En cantidad actual , Ingresar Números!!'),
    body('cantidad_sistema01').notEmpty().withMessage('Debe escribir la cantidad de sistema del inventario').isFloat().withMessage('En cantidad de sistema,  Ingresar Números!!'),
    body('costo01').notEmpty().withMessage('Debe escribir el costo del inventario').isFloat().withMessage('En costo, No Ingresar Letras!!'),
    body('precio01').notEmpty().withMessage('Debe escribir el precio del inventario').isFloat().withMessage('En precio, No Ingresar Letras!!'),
    body('fechahora01').notEmpty().withMessage('Debe escribir la fecha y hora del inventario'),
    body('balance_existencia01').notEmpty().withMessage('Debe escribir el balance de existencia del inventario').isFloat().withMessage('En balance, No Ingresar Letras!!'),
    body('faltante01').notEmpty().withMessage('Debe escribir el faltante del inventario').isFloat().withMessage('En faltante, No Ingresar Letras!!'),
    body('sobrante01').notEmpty().withMessage('Debe escribir el sobrante del inventario').isFloat().withMessage('En sobrante, No Ingresar Letras!!'),

    controladorInventariosFisico.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorInventariosFisico.Eliminar);

module.exports = rutas;