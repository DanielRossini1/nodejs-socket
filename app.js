const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var users = ['doido'];

io.on('connection', (socket) => {
    socket.on("logar", (user) => {
        if(users.indexOf(user) == -1){
            users.push(user);
            socket.emit("logar", true);
        }else{
            socket.emit('logar', false);
        }
    });
});

server.listen(3000);