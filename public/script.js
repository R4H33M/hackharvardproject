let socket;
let currentTime = 0;
let started = false;
let intervalID;
let number = 0;

function count(){
    currentTime++;
    document.getElementById("startbutton").innerHTML = currentTime + " seconds connecting";
}

function enterRoom() {
    // console.log("helo")
    document.getElementById("waitingRoom").style.display = "block";
    socket = io();
    socket.on('connect', () => {
        console.log("client connected via sockets");
        let data = {
            "name": document.getElementById("uname").value,
            "room": document.getElementById("room").value
        }
        socket.emit('userData', data);
    })

    socket.on('starttimer', () => {
        startTimer()
    })

    socket.on('stoptimer', () => {
        stopTimer()
    })

    document.getElementById("loginPage").style.display = "none";


    socket.on('namelist', (data) => {
        console.log("namelist", data);
        displayList(data);
    })
}

function startTimer() {
    if (started) {
        //window.clearInterval(intervalID)
    } else {
        stillstart()
        intervalID = window.setInterval(count, 1000);
        started = true;
        socket.emit("startedtimer")

    }
}

function stopTimer() {
    if (started) {
        socket.emit("stoptimer")
        window.clearInterval(intervalID)
        document.getElementById("waitingRoom").style.display = "none";
        document.getElementById("finalScreen").innerHTML =
        "Well done! You connected for " + currentTime + "s econds with " + number + " people!"
        document.getElementById("finalScreen").style.display = "block";
    }
}

function displayList(namelist) {
    let html = "";
    number = namelist.length;
    for (let ind in namelist) {
        html += "<li>" + namelist[ind] + "</li><br>";
    }
    document.getElementById("namelist").innerHTML = html;
    document.getElementById("namelist").style.display = "flex";
}