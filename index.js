//importar librerias
const express = require('express');
//permite función de servidor
const path = require('path');
//trae las rutas del proyecto
const multer = require('multer');
//generador de id's únicos
const { v4: uuidv4 } = require('uuid');
//vision aritificial
const route = require('./models/preprocess.js'); 
require('dotenv').config();


const storage = multer.diskStorage({

    destination: path.join(__dirname, 'images/uploads'),
    filename: (req, file, cb) =>{
        let name = uuidv4()
        route(`../images/uploads/imagen-${name}.jpg`);
        cb(null, `imagen-${name}.jpg`);
        
    }

});

// App de Express, inicia el servidor
const app = express();

// Node Server, parametros que utiliza el servidor
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket'); //websockets

//middlewares

app.use(multer({
    storage: storage,
    dest: 'images/uploads'

}).single('image'));

app.post('/upload', (req, res) => {

    console.log(req.file);
    res.send('uploaded');

});

// Dirección donde se encuentra la ruta "public"
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

//inicialización del servidor y comprobación del puerto
server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


