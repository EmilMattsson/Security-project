'use strict';

const RaspiCam = require('raspicam');
const RaspiSensors = require('raspi-sensors')
var counter = 0;
var camera;
camera = new RaspiCam({
    mode: 'timelapse',
    output: ('/home/emil/Security-project/test%d.jpg', counter++),
    vf: true,
    // exposure: 'night',
    w: 1920,
    h: 1080,
    tl: 500,
    timeout: 10000
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
