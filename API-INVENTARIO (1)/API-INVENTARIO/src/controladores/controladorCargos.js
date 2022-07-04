const { validationResult } = require('express-validator');
const ModeloCargo = require('../modelos/ModeloCargo');

exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloCargo.findAll();
        //console.log(lista[0].NombreCargo);
        console.log(JSON.stringify(lista, null, 2));
        msj.mensaje = 'Petición Procesada Correctamente!!';
        res.json(lista);

    } catch (error) {
        console.error(error);
        msj.mensaje = 'Ocurrió un Error!!';

    }

    res.json(msj);
};

exports.GuardarPost = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { nombre, descripcion } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            if (!descripcion) {
                await ModeloCargo.create({
                    nombre: nombre,

                });
            } else {
                await ModeloCargo.create({
                    nombre: nombre,
                    descripcion: descripcion
                });
            }

            msj.mensaje = 'Registro Guardado correctamente';

        } catch (error) {
            console.error(error);
            msj.mensaje = 'ERROR!! A l Guardar los Datos ';
        }

    }
    res.json(msj);
};



exports.ModificarPut = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors[0]);
    console.log(req.body);
    const { id } = req.query;
    const { nombre, descripcion } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarCargo = await ModeloCargo.findOne({
                where: {
                    CodigoCargo: id
                }
            });
            if (!buscarCargo) {
                buscarCargo.nombre = nombre;
            } else {
                buscarCargo.nombre = nombre;
                buscarCargo.descripcion = descripcion;
            }
            await buscarCargo.save();
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
            var buscarCargo = await ModeloCargo.findOne({
                where: {
                    CodigoCargo: id
                }

            });
            if (!buscarCargo) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await ModeloCargo.destroy({
                    where: {
                        CodigoCargo: id
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