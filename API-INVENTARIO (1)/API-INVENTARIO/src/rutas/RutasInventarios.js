const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInventarios = require('../controladores/ControladorInventarios');
const rutas = Router();

rutas.get('/', controladorInventarios.InicioRutas);

rutas.get('/listar', controladorInventarios.Listar);


rutas.post('/guardar/',
    body('fechahora01').notEmpty().withMessage('Debe escribir la fecha del inventario').withMessage('En la fecha del inventario, No Ingresar Letras!!'),
    body('faltante01').notEmpty().withMessage('Debe escribir el faltante del inventario').isFloat().withMessage('En faltante, No Ingresar Letras!!'),
    body('sobrante01').notEmpty().withMessage('Debe escribir el sobrante del inventario').isFloat().withMessage('En sobrante, No Ingresar Letras!!'),
    body('usuariosRegistro01').notEmpty().withMessage('Debe escribir el usuario de registro del inventario').isInt().withMessage('En Usuario de registro, No Ingresar Letras!!'),
    body('existencia01').notEmpty().withMessage('Debe escribir la existencia de registro del inventario').isInt().withMessage('En Existencia, No Ingresar Letras!!'),
    body('estaciones01').notEmpty().withMessage('Debe escribir la estacion del inventario').isInt().withMessage('En la estacion, No Ingresar Letras!!'),


    controladorInventarios.GuardarPost);


rutas.put('/modificar/',
    query('id').notEmpty().withMessage('Debe escribir el ID del Cargo').isInt().withMessage('El ID del Cargo debe ser un NÚmero Entero'),
    body('fechahora01').notEmpty().withMessage('Debe escribir la fecha del inventario').withMessage('En la fecha del inventario, No Ingresar Letras!!'),
    body('faltante01').notEmpty().withMessage('Debe escribir el faltante del inventario').isFloat().withMessage('En faltante, No Ingresar Letras!!'),
    body('sobrante01').notEmpty().withMessage('Debe escribir el sobrante del inventario').isFloat().withMessage('En sobrante, No Ingresar Letras!!'),
    body('usuariosRegistro01').notEmpty().withMessage('Debe escribir el usuario de registro del inventario').isInt().withMessage('En Usuario de registro, No Ingresar Letras!!'),
    body('existencia01').notEmpty().withMessage('Debe escribir la existencia de registro del inventario').isInt().withMessage('En Existencia, No Ingresar Letras!!'),
    body('estaciones01').notEmpty().withMessage('Debe escribir la estacion del inventario').isInt().withMessage('En la estacion, No Ingresar Letras!!'),
    controladorInventarios.ModificarPut);


rutas.delete('/eliminar/',
    query('id').notEmpty().withMessage('Debe escribir el id del usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero'),
    controladorInventarios.Eliminar);

module.exports = rutas;