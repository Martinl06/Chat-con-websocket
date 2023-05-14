//crear servidor
const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT

// importar http
const http = require('http');
const server = http.createServer(app);

//Views engine require
const handlebars = require('express-handlebars');
//importar rutas
const homeRouter = require('./router/home.router');
// importar socket
const {Server} = require('socket.io');
const io = new Server(server)


//PUBLIC
app.use(express.static(__dirname +'/public'));

//VIEWS
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//rutas
app.use('/home', homeRouter)


let messages = [];

//socket io (canal abierto para todos los usuarios)
io.on('connection', (socket)=>{
    console.log('Usuario conectado');
    socket.emit('mensaje-bienvenida', 'Bienvenido al chat con websocket');
    
    socket.on('New-message', (data)=>{
        console.log(data);
        messages.push(data);
        io.sockets.emit('messages-all', messages);
    })
})


server.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto 8080');
})