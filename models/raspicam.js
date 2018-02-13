'use strict';

var RaspiCam = require('raspicam');
var Sensor = require('pi-pir-sensor');

// vf = vertical flip - flipping the camera because it's upside down for some reason
var camera;
var tmp = 0;
camera = new RaspiCam({
    mode: 'photo',
    output: '/home/emil/Security-project/'+tmp+'test.jpg',
    vf: true,
    // exposure: 'night',
    w: 1920,
    h: 1080
});
//camera.start();

var sensor = new Sensor({
    pin: 7,
    loop: 1500
});

sensor.on('movement', function() {
    camera.start();
    tmp = tmp + 1;
});

//start sensor
sensor.start();
