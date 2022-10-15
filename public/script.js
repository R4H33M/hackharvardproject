function namesubmitted() {
    console.log("helo")
    let socket = io();
    socket.on('connect', () => {
        console.log("client connected via sockets");
        let data = {
            "name": document.getElementById("uname").value,
            "room": document.getElementById("psw").value
        }
        socket.emit('userData', data);
    })
    document.getElementById("firstform").style.display = "none";
}


    // recieve prev msgs 