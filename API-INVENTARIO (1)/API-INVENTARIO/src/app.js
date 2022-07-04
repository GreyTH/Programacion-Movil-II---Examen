const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/', require('./rutas/index'));
app.use('/api/cargos', require('./rutas/RutasCargos'));
app.use('/api/usuarios', require('./rutas/RutasUsuarios'));
app.use('/api/empleados', require('./rutas/RutasEmpleados'));
app.use('/api/clientes', require('./rutas/RutasClientes'));
app.use('/api/productos', require('./rutas/RutasProductos'));
app.use('/api/impuestos', require('./rutas/RutasImpuestos'));
app.use('/api/tipoproductos', require('./rutas/RutasTipoProductos'));
app.use('/api/producto_impuesto', require('./rutas/RutasProductos_Impuestos'));
app.use('/api/inventarios', require('./rutas/RutasInventarios'));
app.use('/api/inventarios_fisico', require('./rutas/RutasInventarioFisicos'));
app.use('/api/detalleinventario', require('./rutas/RutasDetalleInventarios'));
app.use('/api/promociones', require('./rutas/RutasPromociones'));
app.listen(app.get('port'), () => {
    console.log(' Servidor iniciado en el puerto ' + app.get('port'));

});