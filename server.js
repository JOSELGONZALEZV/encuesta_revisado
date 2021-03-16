// utliza express y debe cargarse en el teminal como npm install express
const { json } = require("express");
const express = require("express");
const app = express();
// se llama con el localhost:8000
const port = 8000;

// se utiliza para trabajar sessiones es decir que cada paguina se carga en forma independiente
const session = require('express-session');

app.use(session({secret: 'codingdojorocks'})); 

// se emplea solo para post, push, delete, en el caso de get no se utiliza
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// pwermite que el servidor lea las carpetas estarticas de acceso publico
app.use(express.static(__dirname + "/public"));
// permite qie el servisdor acceda a las carpetas de vistas (views)
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//accedemos al sistema de rutas definidos en la carpeta de rutas (servicio en este caso) 
app.use(require('./routes/servicios'));

const server = app.listen( port, () => console.log(`Listening on port: ${port}`) );

const io = require('socket.io')(server);

io.on('connection', function(socket) {
        // espero información desde el cliente
    socket.on('formulario_informacion', function(data) {
    console.log(data);
    const numero = Math.floor(Math.random()*1000);
    console.log(numero);
    socket.emit('mensaje_actualizado', data);
    console.log(data);
    socket.emit('numero_aleatorio', {numero:numero});

    });
});
let count = 0;

io.on('connection', function(socket){
    socket.on('count_activ', function(data){
    count++;
    io.emit("count_actualizado", {count:count});
    });
    
    socket.on('count_resert', function(data){
    count = 0;
    io.emit("count_atualizado",{count:count});
    });

});


io.on('connection', function(socket){

    socket.on('activ_color', function(data){
    
    io.emit('color_actualizado', data )
    });


    /*socket.on('activ_color_red', function(data){
    let color = 'red';
    io.emit('color_actualizado', {color_red:color});
    });

    socket.on('activ_color_blue', function(data){
    let color = 'blue'
    io.emit('color_actualizado',{color_blue:color});
    });

    socket.on('activ_color_yellow', function(data){
    let color = 'yellow'
    io.emit('color_actualizado',{color_yellow:color});
    });*/

});

