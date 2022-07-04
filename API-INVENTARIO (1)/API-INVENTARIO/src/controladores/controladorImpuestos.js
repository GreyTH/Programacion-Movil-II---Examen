const { validationResult } = require('express-validator');
const ModeloImpuesto = require('../modelos/ModeloImpuesto');



exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/impuestos/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/impuestos/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/impuestos/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/impuestos/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "impuestos",
        rutas: [{
                ruta: "/api/impuestos",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de impuestos"
            },
            {
                ruta: "/api/impuestos/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los impuestos"
            },

            {
                ruta: "/api/impuestos/guardar",
                metodo: "post",
                parametros: {
                    nombre_imp01: "El Nombre del Impuesto. Obligatorio",
                    valor_imp01: "El Valor del Impuesto.",
                },
                descripcion: "Guarda los datos del impuestos"
            },
            {
                ruta: "/api/impuestos/modificar",
                metodo: "post",
                parametros: {
                    nombre_imp01: "El Nombre del Impuesto. Obligatorio",
                    valor_imp01: "El Valor del Impuesto.",

                },
                descripcion: "Actualiza los datos del impuestos"
            },
            {
                ruta: "/api/impuestos/eliminar",
                metodo: "post",
                parametros: {
                    id: "Identificador del impuestos de tipo entero. Obligatorio."
                },
                descripcion: "Elimina los datos del impuestos"
            },
        ],
    }];



    const msj = {

        api: "API-Inventario",
        Modulo: "IMPUESTO",
        desarrollador: "Greysi Lizeth Molina",
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

        const lista = await ModeloImpuesto.findAll();
        console.log(JSON.stringify(lista));
        res.json(lista);

    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrió un Error!!';

        res.json(msj);
    }


};



exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloImpuesto.findAll();
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
    const { nombre_imp01, valor_imp01 } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            if (!valor_imp01) {
                await ModeloImpuesto.create({
                    nombre_imp: nombre_imp01,

                });
            } else {
                await ModeloImpuesto.create({
                    nombre_imp: nombre_imp01,
                    valor_imp: valor_imp01
                });
            }

            msj.mensaje = 'Registro Guardado correctamente!!';

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
    const { nombre_imp01, valor_imp01 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarImpuesto = await ModeloImpuesto.findOne({
                where: {
                    id_impuesto: id
                }
            });
            if (!buscarImpuesto) {
                buscarImpuesto.nombre_imp = nombre_imp01;
            } else {
                buscarImpuesto.nombre_imp = nombre_imp01;
                buscarImpuesto.valor_imp = valor_imp01;
            }
            await buscarImpuesto.save();
            msj.mensaje = 'Registro Modificado Correctamente!!';
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
            var buscarImpuesto = await ModeloImpuesto.findOne({
                where: {
                    id_impuesto: id
                }

            });
            if (!buscarImpuesto) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloImpuesto.destroy({
                    where: {
                        id_impuesto: id
                    }

                });

                msj.mensaje = 'Registro Eliminado correctamente';
            }
        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!! Al Eliminar los Datos ';
        }

    }
    res.json(msj);
};