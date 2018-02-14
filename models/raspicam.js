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
let lastCheck = 0
pir.fetchInterval((err, data) => {
  if (err) {
    console.error('An error occured!')
    console.error(err.cause)
    return
  }
  if (data.value === 1) {
    if (lastCheck === 1){
      camera.start()
    }
    console.log(data)
  }else {
    console.log(data)
  }
  lastCheck = data.value

}, 1)
