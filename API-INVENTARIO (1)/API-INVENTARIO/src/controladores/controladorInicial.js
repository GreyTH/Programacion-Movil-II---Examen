const { validationResult } = require('express-validator');
exports.Inicio = (req, res) => {

    const listaModulos = [
        { modulo: "producto", ruta: "/api/productos" },
        { modulo: "impuesto", ruta: "/api/impuestos" },
        { modulo: "tipoproducto", ruta: "/api/tipoproductos" },
        { modulo: "Productos_impuestos", ruta: "/api/producto_impuesto" },
        { modulo: "inventario", ruta: "/api/inventarios" },
        { modulo: "inventarios_fisico1", ruta: "/api/inventariofisico" },

    ];
    const msj = {

        api: "API-Inventario",
        descripcion: "Interfaz de programacion para el sistema de Inventario",
        propiedad: "Grupo: #3",
        Integrantes: "Inge. Karen Alexandra Juarez Gutierrez",
        Integrantes: "Inge. Yovana Sadith Gomez Rodriguez",
        Integrantes: "Inge. Greysi Lizeth Molina",
        Integrantes: "Inge. Ludwin Alvarado",
        colaboradores: "Grupo: #3",
        fecha: "19/05/2022",
        listaModulos
    };

    res.json(msj);
};


exports.EjemploPost = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    //const { usuario, contraseña } = req.body;

    const usuario2 = req.body.usuario;
    const contraseña2 = req.body.contraseña;

    console.log(usuario2);
    console.log(contraseña2);
    const msj = {

        mensaje: "Ninguno"

    };

    if (!contraseña2 || !usuario2) {
        msj.mensaje = 'Debe escribir todos los campos';

    } else {
        msj.mensaje = 'Peticion ejecutada correctamente';
    }
    res.json(msj);
};

exports.EjemploPut = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    //const { usuario, contraseña } = req.body;
    const { id } = req.query;
    const usuario2 = req.body.usuario;
    const contraseña2 = req.body.contraseña;

    console.log(usuario2);
    console.log(contraseña2);
    const msj = {

        mensaje: "Ninguno"

    };

    if (!contraseña2 || !usuario2) {
        msj.mensaje = 'Debe escribir todos los campos';

    } else {
        msj.mensaje = 'Peticion ejecutada correctamente';
    }
    res.json(msj);
};

exports.EjemploDelete = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const msj = {

        mensaje: "ERROR!! "

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
        //msj.mensaje='Debe escribir todos los campos';

    } else {
        msj.mensaje = 'Peticion ejecutada correctamente';
    }
    res.json(msj);
};