'use strict';

var RaspiCam = require('raspicam');
var Sensor = require('pi-pir-sensor');

// vf = vertical flip - flipping the camera because it's upside down for some reason
var camera;
camera = new RaspiCam({
    mode: 'photo',
    output: '/home/emil/Security-project/test.jpg',
    vf: true,
    // exposure: 'night',
    w: 1920,
    h: 1080
});
//camera.start();

var sensor = new Sensor({
    pin: 12,
    loop: 1500
});

sensor.on('movement', function() {
    camera.start();
});

//start sensor
sensor.start();
