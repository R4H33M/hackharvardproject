//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let rooms = {};
let users = {};
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    socket.on('userData', (data) => {
        let uid = socket.id;
        let name = data.name;
        let room = data.room;

        users[uid] = name;

        if (rooms[room]) {
            rooms[room].push(uid);
        } else {
            rooms[room] = [uid];
        }

        console.log(rooms, rooms[room])
        let namelist = rooms[room].forEach(uid => {
            users[uid]
        });

        rooms[room].forEach(uid => {
            socket.to(uid).emit('namelist', namelist);
        });
    })

    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");

    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});
