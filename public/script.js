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
        displayList(data);
    })
}

function displayList(namelist) {
    let html = "";
    for (let ind in namelist) {
        html += "<li>" + namelist[ind] + "</li><br>";
    }
    document.getElementById("namelist").innerHTML = html;
    document.getElementById("namelist").style.display = "flex";
}