'use strict'

var mongoose = require('mongoose');
var express = require('express');
var port = process.env.PORT || 3900;
var bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY ,
   api_secret:  process.env.CLOUDINARY_API_SECRET 
});

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

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
app.post('/api/upload-image', (req,res, next)=>{
       const file = req.files.photo;

       cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
               res.send({
                       success: true, 
                       result
               })
       });
});



app.get('/api/get-image/:image', ArticleController.getImage);
app.get('/api/search/:search', ArticleController.search);