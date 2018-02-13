'use strict';

var RaspiCam = require('raspicam');
var Sensor = require('pi-pir-sensor');
//const tessel = require('tessel');
//const pir = require('pir').use(7);

var gpio = require('rpi-gpio')
var pir = { pin: 12, loopTime: 1500, tripped: false, value: undefined }
gpio.setup(pir.pin, DIR_IN,function(error, value) {
  if(error){
    console.log('Error:'+error);
  }
})
var readInterval = function() { gpio.read(pir.pin, function(error, value) {
    // we only want to move on if something changed
     if (value === pir.tripped) {
       return pir.tripped = value
     }
      if (pir.tripped){
          console.log('tripped!')
      } else {
        console.log(pir.tripped)
        console.log("it's quiet... a little TOO quiet..." + value)
      }
  })
}
  var onSetup = function(error) {
    if (error) console.error(error)
    return setInterval(readInterval, pir.loopTime)
   }
  gpio.setMode(gpio.MODE_RPI)
  gpio.setup(pir.pin, gpio.DIR_IN, onSetup)
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
    pin: 7,
    loop: 1500
});

// pir.on('ready', pir => {
//   console.log('Ready...')
//   pir.on('movement:start', time => {
//     console.log(`Something moved! Time ${time}`)
//   });
//   pir.on('movement:end', time => {
//     console.log(`All is still. Time ${time}`);
//   });
// });
