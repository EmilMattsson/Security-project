'use strict';

var RaspiCam = require('raspicam');
var Sensor = require('pi-pir-sensor');
//const tessel = require('tessel');
//const pir = require('pir').use(7);
var gpio = require('rpi-gpio')
var pir = { pin: 7, loopTime: 1500, tripped: false, value: undefined }
var readInterval = function() { gpio.read(pir.pin, function(error, value) {
    // we only want to move on if something changed
     if (value === pir.tripped) {
       return pir.tripped = value if (pir.tripped) console.log('tripped!')
   }else {
     console.log("it's quiet... a little TOO quiet...")
   }
  }) }
  var onSetup = function(error) { if (error) console.error(error) return setInterval(readInterval, pir.loopTime) }
  gpio.setMode(gpio.MODE_RPI)
  gpio.setup(pir.pin, gpio.DIR_IN, onSetup)
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

// var sensor = new Sensor({
//     pin: 7,
//     loop: 1500
// });
//
// sensor.on('movement', function() {
//     camera.start();
//     tmp = tmp + 1;
// });
//
// //start sensor
// sensor.start();

// pir.on('ready', pir => {
//   console.log('Ready...')
//   pir.on('movement:start', time => {
//     console.log(`Something moved! Time ${time}`)
//   });
//   pir.on('movement:end', time => {
//     console.log(`All is still. Time ${time}`);
//   });
// });
