const { validationResult } = require('express-validator');
const ModeloPromocion = require('../modelos/ModeloPromocion');
const ModeloProducto = require('../modelos/ModeloProducto');

exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/promociones/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/promociones/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/promociones/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/promociones/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "promociones",
        rutas: [{
                ruta: "/api/promociones",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de promociones"
            },
            {
                ruta: "/api/promociones/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todas las promociones"
            },

            {
                ruta: "/api/promociones/guardar",
                metodo: "post",
                parametros: {
                    ProductosCodigo: "Identificador del producto (llave foranea). Obligatorio",
                    Inicio: "Fecha de inicio de la promoción. Obligatorio",
                    Fin: "Fecha de finalización de la promoción. Obligatorio",
                    Creado: "Fecha de creación de promoción",
                    Modificado: "Fecha de modificación de promoción"
                },
                descripcion: "Guarda los datos del Promociones"
            },
            {
                ruta: "/api/promociones/modificar",
                metodo: "put",
                parametros: {
                    id: "Identificador del registro que desea modificar",
                    ProductosCodigo: "Identificador del producto de la tabla >productos< (llave foranea). Obligatorio",
                    Inicio: "Fecha de inicio de la promoción. Obligatorio",
                    Fin: "Fecha de finalización de la promoción. Obligatorio",
                    Creado: "Fecha de creación de promoción",
                    Modificado: "Fecha de modificación de promoción"
                },
                descripcion: "Actualiza las fechas de las promociones"
            },
            {
                ruta: "/api/promociones/eliminar",
                metodo: "delete",
                parametros: {
                    Id: "Identificador del registro que desea eliminar. Obligatorio."
                },
                descripcion: "Elimina los datos del promociones"
            },
        ],
    }];



    const msj = {

        api: "API-Inventario",
        Modulo: "promociones",
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
        const lista = await ModeloPromocion.findAll();
        console.log(JSON.stringify(lista, null, 2));
        msj.mensaje = 'Peticion procesada correctamente';
        res.json(lista);
    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrio un error';
        res.json(msj);
    }
};

exports.GuardarPost = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { ProductosCodigo, Inicio, Fin, Creado, Modificado } = req.body;
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
            if (!buscarProducto) {
                msj.mensaje = 'No Existe El Codigo del Producto Especificado';
            } else {


                await ModeloPromocion.create({
                    productos_Codigo: ProductosCodigo,
                    inicio: Inicio,
                    fin: Fin,
                    creado: Creado,
                    modificado: Modificado
                });

                msj.mensaje = 'Registro Guardado correctamente';
            }

        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!! Al Guardar los Datos ';
        }

    }
    res.json(msj);
};



exports.ModificarPut = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const { ProductosCodigo, Inicio, Fin, Creado, Modificado } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {


            var buscarPromocion = await ModeloPromocion.findOne({
                where: {
                    id: id
                }
            });
            if (!buscarPromocion) {
                buscarPromocion.productos_Codigo = ProductosCodigo;
                buscarPromocion.inicio = Inicio;
            } else {

                var buscarProducto = await ModeloProducto.findOne({
                    where: {
                        codigoProduct1: ProductosCodigo
                    }
                })
                if (!buscarProducto) {
                    msj.mensaje = 'No Existe el Codigo del Producto Especificado';
                } else {
                    buscarPromocion.productos_Codigo = ProductosCodigo;
                    buscarPromocion.inicio = Inicio;
                    buscarPromocion.fin = Fin;
                    buscarPromocion.creado = Creado;
                    buscarPromocion.modificado = Modificado;

                    await buscarPromocion.save();
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
            var buscarPromocion = await ModeloPromocion.findOne({
                where: {
                    id: Id
                }
            });
            if (!buscarPromocion) {
                msj.mensaje = 'No existe el id del registro';
            } else {
                await ModeloPromocion.destroy({
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