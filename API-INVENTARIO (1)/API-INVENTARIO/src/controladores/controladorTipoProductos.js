const { validationResult } = require('express-validator');
const ModeloTProducto = require('../modelos/ModeloTipoProducto');

exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/tipoproductos/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/tipoproductos/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/tipoproductos/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/tipoproductos/eliminar" },
    ];

    const DescripcionModulos = [{
        modulo: "tipoproductos",
        rutas: [{
                ruta: "/api/tipoproductos",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de tipoproductos"
            },
            {
                ruta: "/api/tipoproductos/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los tipoproductos"
            },

            {
                ruta: "/api/tipoproductos/guardar",
                metodo: "post",
                parametros: {
                    Nombre01: "El Nombre del Tipo Productos. Obligatorio",
                    Descripcion_Tipo01: "Descripción del Tipo Productos.",
                    Orden01: "La Orden del Tipo Productos.",
                    Id_Tipo_Pricipal01: "El Id_Tipo_Pricipal01 del Tipo Productos.",
                    Nombre_Imagen01: "El Nombre de la Imagen del Tipo Productos. Obligatorio.",
                },
                descripcion: "Guarda los datos del tipoproductos"
            },
            {
                ruta: "/api/tipoproductos/modificar",
                metodo: "post",
                parametros: {
                    Nombre01: "El Nombre del Tipo Productos. Obligatorio",
                    Descripcion_Tipo01: "Descripción del Tipo Productos.",
                    Orden01: "La Orden del Tipo Productos.",
                    Id_Tipo_Pricipal01: "El Id_Tipo_Pricipal01 del Tipo Productos.",
                    Nombre_Imagen01: "El Nombre de la Imagen del Tipo Productos. Obligatorio.",

                },
                descripcion: "Actualiza los datos del tipoproductos"
            },
            {
                ruta: "/api/tipoproductos/eliminar",
                metodo: "post",
                parametros: {
                    id: "Identificador del tipoproductos de tipo entero. Obligatorio."
                },
                descripcion: "Elimina los datos del tipoproductos"
            },
        ],
    }];



    const msj = {

        api: "API-Inventario",
        Modulo: "Tipo Productos",
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

        const lista = await ModeloTProducto.findAll();
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
    const { Nombre01, Descripcion_Tipo01, Orden01, Id_Tipo_Pricipal01, Nombre_Imagen01 } = req.body;
    //los 01 son datos del Thunder
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            await ModeloTProducto.create({
                Nombre_Tipo: Nombre01,
                Descripcion_Tipo: Descripcion_Tipo01,
                Orden: Orden01,
                Id_Tipo_Principal: Id_Tipo_Pricipal01,
                Nombre_Imagen: Nombre_Imagen01
            });

            msj.mensaje = 'Registro Guardado Correctamente!!!';

        } catch (error) {
            console.error(error);
            msj.mensaje = '*ERROR!!! Al Guardar los Datos* ';
        }

    }
    res.json(msj);
};



exports.ModificarPut = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const { Nombre01, Descripcion_Tipo01, Orden01, Id_Tipo_Pricipal01, Nombre_Imagen01 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarTProducto = await ModeloTProducto.findOne({
                where: {
                    Codigo_Tipo: id
                }
            });
            if (!buscarTProducto) {
                buscarTProducto.Nombre_Tipo = Nombre01;
                buscarTProducto.Descripcion_Tipo = Descripcion_Tipo01;
            } else {

                buscarTProducto.Nombre_Tipo = Nombre01;
                buscarTProducto.Descripcion_Tipo = Descripcion_Tipo01;
                buscarTProducto.Orden = Orden01;
                buscarTProducto.Id_Tipo_Principal = Id_Tipo_Pricipal01;
                buscarTProducto.Nombre_Imagen = Nombre_Imagen01;
            }
            await buscarTProducto.save();
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
            var buscarTProducto = await ModeloTProducto.findOne({
                where: {
                    codigo_Tipo: id
                }

            });
            if (!buscarTProducto) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloTProducto.destroy({
                    where: {
                        codigo_Tipo: id
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