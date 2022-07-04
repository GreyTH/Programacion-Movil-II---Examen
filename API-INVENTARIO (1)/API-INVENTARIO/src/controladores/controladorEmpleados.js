const { validationResult } = require('express-validator');
const ModeloEmpleado = require('../modelos/ModeloEmpleado');
const ModeloCargo = require('../modelos/ModeloCargo');


exports.Listar = async(req, res) => {
    var msj = {
        mensaje: ''
    }
    try {

        const lista = await ModeloEmpleado.findAll();

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
    const { identidad01, nombre01, apellido01, idcargo01, fechaingreso01, salario01, nombreimagen01, nombrecompleto01 } = req.body;
    var msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });

    } else {
        try {

            var buscarCargo = await ModeloCargo.findOne({
                where: {
                    id: idcargo01
                }
            });
            if (!buscarCargo) {
                msj.mensaje = 'No Existe El Cargo de Producto Especificado';
            } else {


                await ModeloEmpleado.create({
                    identidad: identidad01,
                    nombre: nombre01,
                    apellido: apellido01,
                    idcargo: idcargo01,
                    fechaingreso: fechaingreso01,
                    salario: salario01,
                    nombreimagen: nombreimagen01,
                    nombrecompleto: nombrecompleto01
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
    const { identidad01, nombre01, apellido01, idcargo01, fechaingreso01, salario01, nombreimagen01, nombrecompleto01 } = req.body;

    const msj = {

        mensaje: ""

    };

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + ' . ';

        });
    } else {
        try {

            var buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: id
                }
            });
            if (!buscarEmpleado) {
                buscarEmpleado.identidad = identidad01;
                buscarEmpleado.nombre = nombre01;
                buscarEmpleado.apellido = apellido01;
            } else {

                var buscarCargo = await ModeloCargo.findOne({
                    where: {
                        id: idcargo01
                    }
                });
                if (!buscarCargo) {
                    msj.mensaje = 'No Existe el Empleado de Cargo Especificado';
                } else {

                    buscarEmpleado.identidad = identidad01;
                    buscarEmpleado.nombre = nombre01;
                    buscarEmpleado.apellido = apellido01;
                    buscarEmpleado.idcargo = idcargo01;
                    buscarEmpleado.fechaingreso = fechaingreso01;
                    buscarEmpleado.salario = salario01;
                    buscarEmpleado.nombreimagen = nombreimagen01;
                    buscarEmpleado.nombrecompleto = nombrecompleto01;
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
            var buscarEmpleado = await buscarEmpleado.findOne({
                where: {
                    id: id
                }

            });
            if (!buscarEmpleado) {
                msj.mensaje = 'No Existe el ID Del Registro';
            } else {
                await buscarEmpleado.destroy({
                    where: {
                        id: id
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