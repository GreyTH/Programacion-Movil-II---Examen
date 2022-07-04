const { validationResult } = require('express-validator');
const ModeloIventario = require('../modelos/ModeloInventario');
const ModeloUsuario = require('../modelos/ModeloUsuario');

exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/inventarios/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/inventarios/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/inventarios/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/inventarios/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "inventarios",
        rutas: [{
                ruta: "/api/inventarios",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de inventarios"
            },
            {
                ruta: "/api/inventarios/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todo el inventario"
            },
            {
                ruta: "/api/inventarios/guardar",
                metodo: "post",
                parametros: {
                    fechahora01: "Fecha y hora del inventario. Obligatorio",
                    faltante01: "Faltante de inventario.",
                    sobrante01: "Sobrantes de inventario.",
                    usuariosRegistro01: "USuario registro de inventario.",
                    estaciones01: "Estacion de inventario.",
                },
                descripcion: "Guarda los datos del inventario"
            },
            {
                ruta: "/api/inventarios/modificar",
                metodo: "put",
                parametros: {
                    fechahora01: "Fecha y hora del inventario. Obligatorio",
                    faltante01: "Faltante de inventario.",
                    sobrante01: "Sobrantes de inventario.",
                    usuariosRegistro01: "Usuario registro de inventario.",
                    estaciones01: "Estacion de inventario.",
                },
                descripcion: "Actualiza los datos del inventario"
            },
            {
                ruta: "/api/inventarios/eliminar",
                metodo: "delete",
                parametros: {
                    id: "Identificador del cargo de tipo entero. Obligatorio."
                },
                descripcion: "Elimina los datos del inventario"
            },
        ],
    }];


    const msj = {

        api: "API-Inventario",
        Modulo: "Inventarios",
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

        const lista = await ModeloIventario.findAll();
        console.log(JSON.stringify(lista));
        res.json(lista);

    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrió un Error!!';
        res.json(msj);
    }
};

//********************************************************** */








exports.GuardarPost = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { fechahora01, faltante01, sobrante01, usuariosRegistro01, estaciones01 } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {

            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    id: usuariosRegistro01
                }
            });
            if (!buscarUsuario) {
                msj.mensaje = 'No Existe El Código Usuario Especificado!!';
            } else {


                await ModeloIventario.create({
                    fechahora: fechahora01,
                    faltante: faltante01,
                    sobrante: sobrante01,
                    usuariosRegistro: usuariosRegistro01,
                    estaciones: estaciones01
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
    const { fechahora01, faltante01, sobrante01, usuariosRegistro01, estaciones01 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {

            var buscarIventario = await ModeloIventario.findOne({
                where: {
                    id_inventario: id
                }
            });
            if (!buscarIventario) {
                buscarIventario.fechahora = fechahora01;

            } else {

                var buscarUsuario = await ModeloUsuario.findOne({
                    where: {
                        id: usuariosRegistro01
                    }
                });
                if (!buscarUsuario) {
                    msj.mensaje = 'No Existe el Codigo Usuario Especificado!!';
                } else {

                    buscarIventario.fechahora = fechahora01;
                    buscarIventario.faltante = faltante01;
                    buscarIventario.sobrante = sobrante01;
                    buscarIventario.usuariosRegistro = usuariosRegistro01;
                    buscarIventario.estaciones = estaciones01;

                    await buscarIventario.save();
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
            var buscarIventario = await ModeloIventario.findOne({
                where: {
                    id_inventario: id
                }

            });
            if (!buscarIventario) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloIventario.destroy({
                    where: {
                        id_inventario: id
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