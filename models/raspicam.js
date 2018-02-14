'use strict';

const RaspiCam = require('raspicam');
const Sensor = require('pi-pir-sensor');
const gpio = require('rpi-gpio')
const pir = { pin: 7, loopTime: 1500, tripped: false, value: undefined }

let readInterval = function() { gpio.read(pir.pin, function(error, value) {
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
let onSetup = function(error) {
  if (error) console.error(error) {
    return setInterval(readInterval, pir.loopTime)
  }
}
gpio.setMode(gpio.MODE_RPI)
gpio.setup(pir.pin, gpio.DIR_IN, onSetup)

let camera
camera = new RaspiCam({
    mode: 'photo',
    output: '/home/emil/Security-project/test.jpg',
    vf: true,
    // exposure: 'night',
    w: 1920,
    h: 1080
})
//camera.start()

var sensor = new Sensor({
    pin: 7,
    loop: 1500
})
