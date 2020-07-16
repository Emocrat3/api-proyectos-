'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3900;
var app = require('./app');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://emocrat3:emocrat3@reactproyecto.plzbz.mongodb.net/reactProyecto? retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
            console.log('La conexion a mongodb se realizo correctamente!');

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                    console.log('Servidor corriendo en http://localhost:' + port);

            });

    });