const { validationResult } = require('express-validator');
const ModeloIventarioFisico = require('../modelos/ModeloInventarioFisico');
const ModeloProducto = require('../modelos/ModeloProducto');
const ModeloIventario = require('../modelos/ModeloInventario');

exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/inventarios_fisico/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/inventarios_fisico/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/inventarios_fisico/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/inventarios_fisico/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "productos",
        rutas: [{
                ruta: "/api/inventarios_fisico",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de cargos"
            },
            {
                ruta: "/api/inventarios_fisico/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los cargos"
            },
            {
                ruta: "/api/inventarios_fisico/guardar",
                metodo: "post",
                parametros: {
                    productos_cod01: "Codigo del producto. Dede de Existir en la Tabla de Producto . Obligatorio.",
                    inventarios_id01: "Id de inventario fisico. Dede de Existir en la Tabla de Inventarios. Obligatorio.",
                    cantidad_actual01: "Cantidad actual del inventario disico. Obligatorio.",
                    cantidad_sistema01: "Cantidad en Sistema del inventario fisico. Obligatorio.",
                    costo01: "Costo del inventario Fisico. Obligatorio.",
                    precio01: "Precio del inventario fisico. Obligatorio.",
                    fechahora01: "Fecha y hora del inventario fisico. Obligatorio.",
                    balance_existencia01: "Balance de existencia del inventario fisico. Obligatorio.",
                    faltante01: "Faltante del inventario fisico. Obligatorio.",
                    sobrante01: "Sobrante del inventario fisico. Obligatorio.",
                },
                descripcion: "Guarda los datos del inventario fisico."
            },
            {
                ruta: "/api/inventarios_fisico/modificar",
                metodo: "put",
                parametros: {
                    productos_cod01: "Codigo del producto. Dede de Existir en la Tabla de Producto . Obligatorio.",
                    inventarios_id01: "Id de inventario fisico. Dede de Existir en la Tabla de Inventarios. Obligatorio.",
                    cantidad_actual01: "Cantidad actual del inventario disico. Obligatorio.",
                    cantidad_sistema01: "Cantidad en Sistema del inventario fisico. Obligatorio.",
                    costo01: "Costo del inventario Fisico. Obligatorio.",
                    precio01: "Precio del inventario fisico. Obligatorio.",
                    fechahora01: "Fecha y hora del inventario fisico. Obligatorio.",
                    balance_existencia01: "Balance de existencia del inventario fisico. Obligatorio.",
                    faltante01: "Faltante del inventario fisico. Obligatorio.",
                    sobrante01: "Sobrante del inventario fisico. Obligatorio.",
                },
                descripcion: "Actualiza los datos del inventario fisico"
            },
            {
                ruta: "/api/inventarios_fisico/eliminar",
                metodo: "delete",
                parametros: {
                    id: "Identificador del inventario fisico de tipo entero. Obligatorio."
                },
                descripcion: "Elimina los datos del inventario fisico"
            },
        ],
    }];


    const msj = {

        api: "API-Inventario",
        Modulo: "Inventarios Fisico",
        desarrollador: "Yovana Zadith Gómez",
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

        const lista = await ModeloIventarioFisico.findAll();
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
    const {
        productos_cod01,
        inventarios_id01,
        cantidad_actual01,
        cantidad_sistema01,
        costo01,
        precio01,
        fechahora01,
        balance_existencia01,
        faltante01,
        sobrante01
    } = req.body;
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
                    codigoProduct1: productos_cod01
                }
            });

            var buscarinventario = await ModeloIventario.findOne({
                where: {
                    id_inventario: inventarios_id01
                }
            });
            if (!buscarProducto || !buscarinventario) {

                msj.mensaje = 'El Código del Producto ó el Inventario no Existen!!';

            } else {
                var buscarIventarioFisico = await ModeloIventarioFisico.findOne({
                    where: {
                        productos_cod: productos_cod01,
                        inventarios_id: inventarios_id01
                    }
                });
                if (!buscarIventarioFisico) {

                    await ModeloIventarioFisico.create({
                        productos_cod: productos_cod01,
                        inventarios_id: inventarios_id01,
                        cantidad_actual: cantidad_actual01,
                        cantidad_sistema: cantidad_sistema01,
                        costo: costo01,
                        precio: precio01,
                        fechahora: fechahora01,
                        balance_existencia: balance_existencia01,
                        faltante: faltante01,
                        sobrante: sobrante01
                    });
                    msj.mensaje = 'Registro Correctamente!!';

                } else {

                    msj.mensaje = 'Este inventarios_fisico ya tiene el Producto o el Invenatrio Asociado!!';
                }
            }

        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!!! Al Guardar los Datos ';
        }

    }
    res.json(msj);
};


exports.ModificarPut = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const {
        productos_cod01,
        inventarios_id01,
        cantidad_actual01,
        cantidad_sistema01,
        costo01,
        precio01,
        fechahora01,
        balance_existencia01,
        faltante01,
        sobrante01
    } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarIventarioFisico = await ModeloIventarioFisico.findOne({
                where: {
                    id_ifisico: id
                }
            });
            if (!buscarIventarioFisico) {
                buscarIventarioFisico.fechahora = fechahora01;

            } else {
                var buscarProducto = await ModeloProducto.findOne({
                    where: {
                        codigoProduct1: productos_cod01
                    }

                });

                var buscarinventario = await ModeloIventario.findOne({
                    where: {
                        id_inventario: inventarios_id01
                    }
                });
                if (!buscarProducto || !buscarinventario) {

                    msj.mensaje = 'El Código del Producto ó el Inventario no Existen!!';

                } else {
                    buscarIventarioFisico.productos_cod = productos_cod01;
                    buscarIventarioFisico.inventarios_id = inventarios_id01;
                    buscarIventarioFisico.cantidad_actual = cantidad_actual01;
                    buscarIventarioFisico.cantidad_sistema = cantidad_sistema01;
                    buscarIventarioFisico.costo = costo01;
                    buscarIventarioFisico.precio = precio01;
                    buscarIventarioFisico.fechahora = fechahora01;
                    buscarIventarioFisico.balance_existencia = balance_existencia01;
                    buscarIventarioFisico.faltante = faltante01;
                    buscarIventarioFisico.sobrante = sobrante01;

                    await buscarIventarioFisico.save();
                    msj.mensaje = 'Registro Modificado Correctamente!!';
                }

            }
        } catch (error) {
            console.error(error);
            msj.mensaje = 'Error Al Modificar los Datos';
        }

    }
    res.json(msj);
};





exports.Eliminar = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            var buscarIventarioFisico = await ModeloIventarioFisico.findOne({
                where: {
                    id_ifisico: id
                }

            });
            if (!buscarIventarioFisico) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloIventarioFisico.destroy({
                    where: {
                        id_ifisico: id
                    }

                });

                msj.mensaje = 'Registro Eliminado Correctamente';
            }
        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!! Al Eliminar los Datos ';
        }

    }
    res.json(msj);
};