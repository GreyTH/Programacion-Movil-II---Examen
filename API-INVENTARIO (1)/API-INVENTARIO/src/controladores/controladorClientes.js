const { validationResult } = require('express-validator');
const ModeloEmpleado = require('../modelos/ModeloEmpleado');

exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloEmpleado.findAll();

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
    const { clientid1, clientnombre1, clientapellido1, clienttelefono1, clientemail1, clientimagen1, clientstatus1 } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {
            await ModeloCliente.create({

                clientid: clientid1,
                clientnombre: clientnombre1,
                clientapellido: clientapellido1,
                clienttelefono: clienttelefono1,
                clientemail: clientemail1,
                clientimagen: clientimagen1,
                clientstatus: clientstatus1,
            });

            msj.mensaje = 'Registro Guardado correctamente';

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
    const { clientid1, clientnombre1, clientapellido1, clienttelefono1, clientemail1, clientimagen1, clientstatus1 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {
            var buscarCliente = await ModeloCliente.findOne({
                where: {
                    idUsuario: id
                }
            });
            if (!buscarCliente) {

                buscarCliente.clientnombre = clientnombre1,
                    buscarCliente.clientapellido = clientapellido1
            } else {


                buscarCliente.clientnombre = clientnombre1,
                    buscarCliente.clientapellido = clientapellido1,
                    buscarCliente.clienttelefono = clienttelefono1,
                    buscarCliente.clientemail = clientemail1,
                    buscarCliente.clientimagen = clientimagen1,
                    buscarCliente.clientstatus = clientstatus1
            }
            await buscarCliente.save();
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
            var buscarEmpleado = await buscarEmpleado.findOne({
                where: {
                    idUsuario: id
                }

            });
            if (!buscarEmpleado) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await buscarEmpleado.destroy({
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