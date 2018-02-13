'use strict'

const RaspiSensors = require('raspi-sensors')

let pir = new RaspiSensors.Sensor({
  type  : 'PIR',
  adress: 12
}, "pir-sensor")

pir.fetchInterval((err, data) => {
  if (err) {
    console.error('An error occured!')
    console.error(err.cause)
    return
  }

  console.log(data)
}, 1)