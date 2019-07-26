const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var user = require('./user.js');

var usersVar = [];

user.user = '';

io.on('connection', (socket) => {
    socket.on("logar", (userString) => {
        if(usersVar.indexOf(userString) == -1){
            usersVar.push(userString);
            user.user = userString;
            socket.emit("logar", true);
        }else{
            socket.emit('logar', false);
        }
    });

    socket.on("getUser", (data)=>{
        socket.emit("getUser", user.user);
    });

    socket.on("getUsersList", (data)=>{
        socket.emit("getUsersList", usersVar);
    });

    socket.on("submitMessage", (data)=>{
        io.emit("submitMessage", data);
    });
});

server.listen(3000);