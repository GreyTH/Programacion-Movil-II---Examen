const { validationResult } = require('express-validator');
const ModeloDetalleInventario = require('../modelos/ModeloDetalleInventario');
const ModeloIventario = require('../modelos/ModeloInventario');
const ModeloProducto = require('../modelos/ModeloProducto');


exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/detalleinventario/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/detalleinventario/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/detalleinventario/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/detalleinventario/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "detalleinventario",
        rutas: [{
                ruta: "/api/detalleinventario",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de detalleinventario"
            },
            {
                ruta: "/api/detalleinventario/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los detalleinventario"
            },

            {
                ruta: "/api/detalleinventario/guardar",
                metodo: "post",
                parametros: {
                    fisico: "Cantidad que hay. Obligatorio",
                    Ultimo: "Cantidad del último inventario. Obligatorio",
                    Ingreso: "Total ingresos. Obligatorio",
                    Egreso: "Total egresos. Obligatorio",
                    Precio: "Precio en inventario. Obligatorio",
                    Actual: "Cantidad en existencia.",
                    Balanceunidad: "Resta de ingresos-egresos",
                    Balanceprecio: "",
                    ProductosCodigo: "Codigo del producto (llave foranea: tabla productos)",
                    InventarioId: "Id de inventario(llave foranea)",

                },
                descripcion: "Guarda los datos del detalleinventario"
            },
            {
                ruta: "/api/detalleinventario/modificar",
                metodo: "put",
                parametros: {
                    id: "Identificador del registro que quiere modificar. Obligatorio",
                    fisico: "Cantidad que hay. Obligatorio",
                    Ultimo: "Cantidad del último inventario. Obligatorio",
                    Ingreso: "Total ingresos. Obligatorio",
                    Egreso: "Total egresos. Obligatorio",
                    Precio: "Precio en inventario. Obligatorio",
                    Actual: "Cantidad en existencia.",
                    Balanceunidad: "Resta de ingresos-egresos",
                    Balanceprecio: "",
                    ProductosCodigo: "Codigo del producto (llave foranea: tabla productos)",
                    InventarioId: "Id de inventario(llave foranea)",

                },
                descripcion: "Actualiza los datos de detalleinventario"
            },
            {
                ruta: "/api/promociones/eliminar",
                metodo: "delete",
                parametros: {
                    Id: "Identificador del registro que desea eliminar. Obligatorio."
                },
                descripcion: "Elimina los datos de detalleinventario"
            },
        ],
    }];



    const msj = {

        api: "API-Inventario",
        Modulo: "detalleinventario",
        desarrollador: "Ludwin Alvarado",
        fecha: "27/06/2022",
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
        const lista = await ModeloDetalleInventario.findAll();
        console.log(JSON.stringify(lista, null, 2));
        msj.mensaje = 'Peticion procesada correctamente';
        res.json(lista);
    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrio un error';
        res.json(msj);
    }
};

//


exports.GuardarPost = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const {
        fisico,
        Ultimo,
        Ingreso,
        Egreso,
        Precio,
        Actual,
        BalanceUnidad,
        BalancePrecio,
        ProductosCodigo,
        InventarioId
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
                    codigoProduct1: ProductosCodigo
                }
            });

            var buscarinventario = await ModeloIventario.findOne({
                where: {
                    id_inventario: InventarioId
                }
            });
            if (!buscarProducto || !buscarinventario) {

                msj.mensaje = 'El Código del Producto ó el Inventario no Existen!!';

            } else {
                var buscarDetalleInventario = await ModeloDetalleInventario.findOne({
                    where: {
                        Fisico: fisico,
                        ultimo: Ultimo
                    }
                });
                if (!buscarDetalleInventario) {
                    await ModeloDetalleInventario.create({
                        Fisico: fisico,
                        ultimo: Ultimo,
                        ingreso: Ingreso,
                        egreso: Egreso,
                        precio: Precio,
                        actual: Actual,
                        balanceunidad: BalanceUnidad,
                        balanceprecio: BalancePrecio,
                        productos_Codigo: ProductosCodigo,
                        inventarios_id: InventarioId
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
        fisico,
        Ultimo,
        Ingreso,
        Egreso,
        Precio,
        Actual,
        BalanceUnidad,
        BalancePrecio,
        ProductosCodigo,
        InventarioId
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
            var buscarDetalleInventario = await ModeloDetalleInventario.findOne({
                where: {
                    id: id
                }
            });
            if (!buscarDetalleInventario) {
                buscarDetalleInventario.Fisico = fisico;

            } else {
                var buscarProducto = await ModeloProducto.findOne({
                    where: {
                        codigoProduct1: ProductosCodigo
                    }

                });

                var buscarinventario = await ModeloIventario.findOne({
                    where: {
                        id_inventario: InventarioId
                    }
                });
                if (!buscarProducto || !buscarinventario) {

                    msj.mensaje = 'El Código del Producto ó el Inventario no Existen!!';

                } else {
                    buscarDetalleInventario.Fisico = fisico;
                    buscarDetalleInventario.ultimo = Ultimo;
                    buscarDetalleInventario.ingreso = Ingreso;
                    buscarDetalleInventario.egreso = Egreso;
                    buscarDetalleInventario.precio = Precio;
                    buscarDetalleInventario.actual = Actual;
                    buscarDetalleInventario.balanceunidad = BalanceUnidad;
                    buscarDetalleInventario.balanceprecio = BalancePrecio;
                    buscarDetalleInventario.productos_Codigo = ProductosCodigo;
                    buscarDetalleInventario.inventarios_id = InventarioId;

                    await buscarDetalleInventario.save();
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




//

exports.Eliminar = async(req, res) => {
    const validaciones = validationResult(req);
    const { Id } = req.query;
    const msj = {
        mensaje: ""
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        })
    } else {
        try {
            var buscarDetalleInventario = await ModeloDetalleInventario.findOne({
                where: {
                    id: Id
                }
            });
            if (!buscarDetalleInventario) {
                msj.mensaje = 'No existe el id del registro';
            } else {
                await ModeloDetalleInventario.destroy({
                    where: {
                        id: Id
                    }
                });
                msj.mensaje = 'Registro elminado correctamente';
            }
        } catch (error) {
            console.error(error);
            msj.mensaje = 'Error al eliminar los datos';
        }

    }
    res.json(msj);
};