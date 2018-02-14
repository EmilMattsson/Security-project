'use strict';

const RaspiCam = require('raspicam');
const RaspiSensors = require('raspi-sensors')

var camera;
camera = new RaspiCam({
    mode: 'photo',
    output: '/home/emil/Security-project/test.jpg',
    vf: true,
    // exposure: 'night',
    w: 1920,
    h: 1080
})

let pir = new RaspiSensors.Sensor({
  type  : 'PIR',
  pin: 7
}, "pir-sensor")

pir.fetchInterval((err, data) => {
  if (err) {
    console.error('An error occured!')
    console.error(err.cause)
    return
  }

  console.log(data)
  camera.start()
}, 1)
