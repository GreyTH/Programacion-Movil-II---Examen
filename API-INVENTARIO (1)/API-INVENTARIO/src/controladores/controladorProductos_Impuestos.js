const { validationResult } = require('express-validator');
const ModeloProductos_impuestos = require('../modelos/ModeloProductos_Impuestos');
const ModeloImpuesto = require('../modelos/ModeloImpuesto');
const ModeloProducto = require('../modelos/ModeloProducto');

exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/producto_impuesto/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/producto_impuesto/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/producto_impuesto/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/producto_impuesto/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "producto_impuesto",
        rutas: [{
                ruta: "/api/producto_impuesto",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de producto_impuesto"
            },
            {
                ruta: "/api/producto_impuesto/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los producto_impuesto"
            },

            {
                ruta: "/api/producto_impuesto/guardar",
                metodo: "post",
                parametros: {
                    idproducto01: "El Codigo del Producto. Debe de Existir en la Tabla Producto",
                    idimpuesto01: "El Codigo del Impuesto. Debe de Existir en la Tabla Impuesto",
                },
                descripcion: "Guarda los datos del producto_impuesto"
            },

        ],
    }];

    const msj = {

        api: "API-Inventario",
        Modulo: "producto_impuesto",
        desarrollador: "Karen Alexandra Juárez",
        fecha: "27/07/2022",
        listaRutas,
        DescripcionModulos
    };

    res.json(msj);
};


exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloProductos_impuestos.findAll();
        console.log(JSON.stringify(lista));
        res.json(lista);

    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrió un Error!!';
        res.json(msj);
    }


};

exports.GuardarPost = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { idproducto01, idimpuesto01 } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            var buscarProducto = await ModeloProducto.findOne({
                where: {
                    codigoProduct1: idproducto01
                }
            });

            var buscarimpuesto = await ModeloImpuesto.findOne({
                where: {
                    id_impuesto: idimpuesto01
                }
            });
            if (!buscarProducto || !buscarimpuesto) {

                msj.mensaje = 'El Producto o el Impuesto no Existen!!';

            } else {
                var buscarExistente = await ModeloProductos_impuestos.findOne({
                    where: {
                        idproducto: idproducto01,
                        idimpuesto: idimpuesto01
                    }
                });
                if (!buscarExistente) {

                    await ModeloProductos_impuestos.create({
                        idproducto: idproducto01,
                        idimpuesto: idimpuesto01
                    });
                    msj.mensaje = 'Registro Correctamente!!';

                } else {

                    msj.mensaje = 'Este Producto ya tiene el Impuesto Asociado!!';
                }
            }

        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!!! Al Guardar los Datos ';
        }

    }
    res.json(msj);
};