'use strict'

var mongoose = require('mongoose');
var express = require('express');
var port = process.env.PORT || 3900;
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var ArticleController = require('./controllers/article');
var multipart = require('connect-multiparty');
var router = require('./routes/article');
var md_upload = multipart({uploadDir: './upload/articles'});
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.get('/api/', ArticleController.probar);
app.post('/api/save', ArticleController.save);
app.get('/api/articles/:last?', ArticleController.getArticles);
app.get('/api/article/:id', ArticleController.getArticle);
app.put('/api/article/:id', ArticleController.update);
app.delete('/api/article/:id', ArticleController.delete);
app.post('/api/upload-image/:id?', md_upload , ArticleController.upload);
app.get('/api/get-image/:image', ArticleController.getImage);
app.get('/api/search/:search', ArticleController.search);