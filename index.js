var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var izenak = {};

var mezuak = [];

io.on('connection', function(socket){
  console.log('a user connected');
    
    console.log(socket.id)

    socket.emit('init', {izenak:izenak,mezuak:mezuak});
    
    io.emit('konexioa', 'norbait');
    
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        mezuak.push({mezua:msg, nork:izenak[socket.id]})
        
        socket.broadcast.emit('chat message', {mezua:msg, nork:izenak[socket.id]});     
            
    });
    
     socket.on('login', function(izena){
        console.log('izena: ' + izena);
        izenak[socket.id] = izena;
        socket.broadcast.emit('konexioa', izena);     
        
            
    });
    
    
    
    
  socket.on('disconnect', function(){
    console.log('user disconnected');
    delete izenak[socket.id];
      
  });    
});




http.listen(3001, function(){
  console.log('listening on *:3000');
});