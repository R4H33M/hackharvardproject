function enterRoom() {
    // console.log("helo")
    let socket = io();
    socket.on('connect', () => {
        console.log("client connected via sockets");
        let data = {
            "name": document.getElementById("uname").value,
            "room": document.getElementById("room").value
        }
        socket.emit('userData', data);
    })

    document.getElementById("loginPage").style.display = "none";


    socket.on('namelist', (data) => {
        console.log("namelist", data);
        displayList(namelist);
    })
}

function displayList(namelist) {
    console.log("bla2: ",namelist)
    let html = ""
    for (username in namelist) {
        html += "<li>" + username + "</li>";
    }
    document.getElementById("namelist").innerHTML += html;
    document.getElementById("namelist").style.display = "flex";
}