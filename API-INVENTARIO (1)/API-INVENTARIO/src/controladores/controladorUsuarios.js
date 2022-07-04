const { validationResult } = require('express-validator');
const ModeloUsuario = require('../modelos/ModeloUsuario');
const ModeloEmpleado = require('../modelos/ModeloEmpleado');

exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloUsuario.findAll();
        //console.log(lista[0].NombreCargo);
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
    const { login1, idempleado1, contrasena1, accesototal1, habilitado1, pin1, fallidos1, correo1, estado1 } = req.body;

    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {

            var buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: idempleado1
                }
            });
            if (!buscarEmpleado) {
                msj.mensaje = 'No Existe El Empleado Especificado';
            } else {


                await ModeloUsuario.create({
                    login: login1,
                    idempleado: idempleado1,
                    contrasena: contrasena1,
                    accesototal: accesototal1,
                    habilitado: habilitado1,
                    pin: pin1,
                    fallidos: fallidos1,
                    correo: correo1,
                    estado: estado1,
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
    const { login1, idempleado1, contrasena1, accesototal1, habilitado1, pin1, fallidos1, correo1, estado1 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {

            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    idUsuario: id
                }
            });
            if (!buscarUsuario) {
                buscarUsuario.login = login1;
                buscarUsuario.contrasena = contrasena1;
            } else {

                var buscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        id: idempleado1
                    }
                });
                if (!buscarEmpleado) {
                    msj.mensaje = 'No Existe el  Codigo Empleado Especificado';
                } else {

                    buscarUsuario.login = login1;
                    buscarUsuario.idempleado = idempleado1;
                    buscarUsuario.contrasena = contrasena1;
                    buscarUsuario.accesototal = accesototal1;
                    buscarUsuario.habilitado = habilitado1;
                    buscarUsuario.pin = pin1;
                    buscarUsuario.fallidos = fallidos1;
                    buscarUsuario.correo1 = correo1;
                    buscarUsuario.estado = estado1;

                    await buscarUsuario.save();
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
            var buscarUsuario = await buscarUsuario.findOne({
                where: {
                    idUsuario: id
                }

            });
            if (!buscarUsuario) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await buscarUsuario.destroy({
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