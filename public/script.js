function namesubmitted() {
    console.log("helo")
    let socket = io();
    socket.on('connect', () => {
        console.log("client connected via sockets");
        let data = {
            "name": document.getElementById("uname").value,
            "room": document.getElementById("room").value
        }
        socket.emit('userData', data);
    })

    socket.on('namelist', (data) => {
        console.log("namelist", data);
    })
    
    document.getElementById("firstform").style.display = "none";
}