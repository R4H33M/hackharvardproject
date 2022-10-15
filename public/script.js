console.log("helo")
let socket = io();
socket.on('connect', () => {
        console.log("client connected via sockets");
        let data = {
            "name": "raheem",
            "room": 19
        }
        socket.emit('userData', data);
    })
    // recieve prev msgs