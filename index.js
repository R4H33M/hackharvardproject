//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let messages = [];
let rooms = {};
let users = {};
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    socket.on('userData', (data) => {
        socket.name = data.name;
        users[socket.name] = socket.id;
        console.log(users);

        socket.roomname = data.room;

        socket.join(socket.roomname);
        if (rooms[socket.roomname]) {
            rooms[socket.roomname]++;
        } else {
            rooms[socket.roomname] = 1;
        }
        console.log(rooms);
    })

    let data = { oldMessages: messages };
    socket.to(socket.roomname).emit('pastMessages', data);
    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
        rooms[socket.room]++;
        delete users[socket.name]
    })
    socket.on('chatMessage', (data) => {
        messages.push(data);
        console.log(messages);
        io.to(socket.roomname).emit('chatMessage', data);


    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});