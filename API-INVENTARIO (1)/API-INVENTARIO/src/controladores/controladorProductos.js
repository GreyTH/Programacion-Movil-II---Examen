const { validationResult } = require('express-validator');
const ModeloProducto = require('../modelos/ModeloProducto');
const ModeloTProducto = require('../modelos/ModeloTipoProducto');
const ModeloUsuario = require('../modelos/ModeloUsuario');


exports.InicioRutas = (req, res) => {

    const listaRutas = [
        { metodo: "GET", peticion: "Listar", ruta: "/api/productos/listar" },
        { metodo: "POST", peticion: "Guardar", ruta: "/api/productos/guardar" },
        { metodo: "PUT", peticion: "Modificar", ruta: "/api/productos/modificar" },
        { metodo: "DELETE", peticion: "Eliminar", ruta: "/api/productos/eliminar" },
    ];
    const DescripcionModulos = [{
        modulo: "productos",
        rutas: [{
                ruta: "/api/productos",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de productos"
            },
            {
                ruta: "/api/productos/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los productos"
            },

            {
                ruta: "/api/productos/guardar",
                metodo: "post",
                parametros: {
                    id: "El código del Producto. Obligatorio",
                    nombreProduct01: "Nombre del Producto. Obligatorio",
                    descripcionProduct01: " Descripción del Producto",
                    TipoProduct01: "El Tipo del Producto debe ser Existente ",
                    existencia01: "La Existencia del Productos. Numeros ",
                    precio01: "El Precio del Productos. Agregar Numeros",
                    costo01: "El Costo del Productos. Agregar Numeros",
                    cantidadminima01: "La cantidad Minima del Productos. Agregar Numeros",
                    exento01: "El Exento del Productos. Agregar Numeros",
                    habilitado01: "El Hablitado del Productos. Agregar Numeros",
                    tipo201: "El Tipo2 Ingresar una opción entre GE, EL, PR, AL",
                    orden01: "El orden01 del Productos. Agregar Numeros",
                    impuestov01: "El impuestov del Productos. Agregar Numeros",
                    impuestovalor01: "El impuestovalor01 del Productos. Agregar Numeros",
                    ultimo01: "El ultimo01 del Productos. Agregar Numeros",
                    nombreimagen01: "El Nombre de la Imagen del Productos",
                    idprincipal01: "El idprincipal01 del Productos. Agregar Numeros",
                    cantidadPrincipal01: "El cantidadPrincipal01 del Productos. Agregar Numeros",
                    idUsuario01: "El idUsuario01 debe de ser existente en la tabla Usuario. Agregar Numeros",
                    movimiento01: "El movimiento01 del Productos.",
                },
                descripcion: "Guarda los datos del productos"
            },
            {
                ruta: "/api/cargos/modificar",
                metodo: "post",
                parametros: {
                    id: "El código del Producto. Obligatorio",
                    nombreProduct01: "Nombre del Producto. Obligatorio",
                    descripcionProduct01: " Descripción del Producto",
                    TipoProduct01: "El Tipo del Producto debe ser Existente. Obligatorio. ",
                    existencia01: "La Existencia del Productos. Numeros ",
                    precio01: "El Precio del Productos. Agregar Numeros",
                    costo01: "El Costo del Productos. Agregar Numeros",
                    cantidadminima01: "La cantidad Minima del Productos. Agregar Numeros",
                    exento01: "El Exento del Productos. Agregar Numeros",
                    habilitado01: "El Hablitado del Productos. Agregar Numeros",
                    tipo201: "El Tipo2 Ingresar una opción entre GE, EL, PR, AL",
                    orden01: "El orden01 del Productos. Agregar Numeros",
                    impuestov01: "El impuestov del Productos. Agregar Numeros",
                    impuestovalor01: "El impuestovalor01 del Productos. Agregar Numeros",
                    ultimo01: "El ultimo01 del Productos. Agregar Numeros",
                    nombreimagen01: "El Nombre de la Imagen del Productos",
                    idprincipal01: "El idprincipal01 del Productos. Agregar Numeros",
                    cantidadPrincipal01: "El cantidadPrincipal01 del Productos. Agregar Numeros",
                    idUsuario01: "El idUsuario01 debe de ser existente en la tabla Usuario. Agregar Numeros",
                    movimiento01: "El movimiento01 del Productos.",
                },
                descripcion: "Actualiza los datos del productos"
            },
            {
                ruta: "/api/productos/eliminar",
                metodo: "post",
                parametros: {
                    id: "Identificador del productos de tipo entero. Obligatorio."
                },
                descripcion: "Elimina los datos del productos"
            },
        ],
    }];
    const msj = {

        api: "API-Inventario",
        Modulo: "PRODUCTOS",
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

        const lista = await ModeloProducto.findAll();
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
    const { id, nombreProduct01, descripcionProduct01, TipoProduct01, existencia01, precio01, costo01, cantidadminima01, exento01, habilitado01, tipo201, orden01, impuestov01, impuestovalor01, ultimo01, nombreimagen01, idprincipal01, cantidadPrincipal01, idUsuario01, movimiento01 } = req.body;

    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            var buscarTipoProduct1 = await ModeloTProducto.findOne({
                where: {
                    codigo_Tipo: TipoProduct01
                }
            });

            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    id: idUsuario01
                }
            });
            if (!buscarTipoProduct1 || !buscarUsuario) {

                msj.mensaje = 'El Código del Tipo Producto ó el Usuario no Existen!!';

            } else {
                var buscarProducto = await ModeloProducto.findOne({
                    where: {
                        codigoProduct1: id
                    }
                });
                if (!buscarProducto) {

                    await ModeloProducto.create({
                        codigoProduct1: id,
                        nombreProduct1: nombreProduct01,
                        descripcionProduct1: descripcionProduct01,
                        TipoProduct1: TipoProduct01,
                        existencia1: existencia01,
                        precio1: precio01,
                        costo1: costo01,
                        cantidadminima1: cantidadminima01,
                        exento1: exento01,
                        habilitado1: habilitado01,
                        tipo2: tipo201,
                        orden1: orden01,
                        impuestov1: impuestov01,
                        impuestovalor1: impuestovalor01,
                        ultimo1: ultimo01,
                        nombreimagen1: nombreimagen01,
                        idprincipal1: idprincipal01,
                        cantidadPrincial1: cantidadPrincipal01,
                        idUsuario1: idUsuario01,
                        movimiento1: movimiento01
                    });

                    msj.mensaje = 'Registro Correctamente!!';

                } else {

                    msj.mensaje = 'El  Código del Producto ya Existe!!';
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
    const { nombreProduct01, descripcionProduct01, TipoProduct01, existencia01, precio01, costo01, cantidadminima01, exento01, habilitado01, tipo201, orden01, impuestov01, impuestovalor01, ultimo01, nombreimagen01, idprincipal01, cantidadPrincipal01, idUsuario01, movimiento01 } = req.body;


    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarProducto = await ModeloProducto.findOne({
                where: {
                    codigoProduct1: id
                }
            });
            if (!buscarProducto) {
                buscarProducto.nombreProduct1 = nombreProduct01;
                buscarProducto.descripcionProduct1 = descripcionProduct01;

            } else {
                var buscarTProducto = await ModeloTProducto.findOne({
                    where: {
                        codigo_Tipo: TipoProduct01
                    }
                });

                var buscarUsuario = await ModeloUsuario.findOne({
                    where: {
                        id: idUsuario01
                    }
                });
                if (!buscarTProducto || !buscarUsuario) {

                    msj.mensaje = 'El Código del Tipo Producto ó el Usuario no Existen!!';

                } else {
                    buscarProducto.nombreProduct1 = nombreProduct01;
                    buscarProducto.descripcionProduct1 = descripcionProduct01;
                    buscarProducto.TipoProduct1 = TipoProduct01;
                    buscarProducto.existencia1 = existencia01;
                    buscarProducto.precio1 = precio01;
                    buscarProducto.costo1 = costo01;
                    buscarProducto.cantidadminima1 = cantidadminima01;
                    buscarProducto.exento1 = exento01;
                    buscarProducto.habilitado1 = habilitado01;
                    buscarProducto.tipo2 = tipo201;
                    buscarProducto.orden1 = orden01;
                    buscarProducto.impuestov1 = impuestov01;
                    buscarProducto.impuestovalor1 = impuestovalor01;
                    buscarProducto.ultimo1 = ultimo01;
                    buscarProducto.nombreimagen1 = nombreimagen01;
                    buscarProducto.idprincipal1 = idprincipal01;
                    buscarProducto.cantidadPrincipal1 = cantidadPrincipal01;
                    buscarProducto.idUsuario1 = idUsuario01;
                    buscarProducto.movimiento1 = movimiento01;

                    await buscarProducto.save();
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
            var buscarProducto = await ModeloProducto.findOne({
                where: {
                    codigoProduct1: id
                }

            });
            if (!buscarProducto) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloProducto.destroy({
                    where: {
                        codigoProduct1: id
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