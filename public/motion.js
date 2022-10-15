let gyro = null;
let prevx = null;
let prevy = null;
let prevz = null;
let started = false;

function stillstart() {
    console.log("tracking started!")
    prevx = gyro.x;
    prevy = gyro.y;
    prevz = gyro.z;
    started = true;
}

try {
    gyro = new Gyroscope({ frequency: 12 });
    gyro.onerror = (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            console.log('Permission to access sensor was denied.');
        } else if (event.error.name === 'NotReadableError') {
            console.log('Cannot connect to the sensor.');
        }
    };

    gyro.onreading = (e) => {
        if (started) {
            if (Math.abs(prevx - gyro.x) > 0.4 || Math.abs(prevy - gyro.y) > 0.4 || Math.abs(prevz - gyro.z) > 0.4) {
                //we touched our phone!
                console.log("you moved too much!")
                document.body.style.backgroundColor = "red";
            }
        }
        document.getElementById("x").innerHTML = "x: " + gyro.x;
        document.getElementById("y").innerHTML = "y: " + gyro.y;
        document.getElementById("z").innerHTML = "z: " + gyro.z;
    };

    gyro.start();
} catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        console.log('Sensor construction was blocked by the Permissions Policy.');
    } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
    } else {
        throw error;
    }
}