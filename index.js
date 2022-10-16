//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
let server = https.createServer(options, app);

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let rooms = {};
let users = {};
// connect to server
io.sockets.on('connect', (socket) => {
console.log(`we have a new client: ${socket.id}`);
    socket.on('userData', (data) => {  
        let uid = socket.id;
        let name = data.name;
        let room = data.room;  
        console.log(`user ${name} entered room ${room}`);

        users[uid] = [name, room];

        if (rooms[room]) {
            rooms[room].push(uid);
        } else {
            rooms[room] = [uid];
        }

        let namelist = [];
        rooms[room].forEach(userId => {
            let username = (users[userId])[0];
            namelist.push(username);
        });

        socket.join(room);
        io.to(room).emit('namelist', namelist);

    })

    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
        // Remove user from maps when they disconnect
        let uid = socket.id;
        let userRoom = (users[uid])[1];
        rooms[userRoom] = rooms[userRoom].filter(userId => userId !== uid);
        delete users[uid]

        let namelist = [];
        rooms[userRoom].forEach(userId => {
            let username = (users[userId])[0];
            namelist.push(username);
        });

        io.to(userRoom).emit('namelist', namelist);
    })

    socket.on('startedtimer', () => {
        console.log("client: ", socket.id, "started timer");
        let userRoom = users[socket.id][1];
        io.to(userRoom).emit("starttimer")
    })

    socket.on('stoptimer', () => {
        console.log("client: ", socket.id, "fucked up");
        let userRoom = users[socket.id][1];
        io.to(userRoom).emit("stoptimer")
    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});
