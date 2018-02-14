'use strict';

const RaspiCam = require('raspicam');
const RaspiSensors = require('raspi-sensors')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eesecsys@gmail.com',
    pass: 'eeee1234'
  }
})

var counter = 0;
var camera;
camera = new RaspiCam({
  mode: 'timelapse',
  output: ('/home/emil/Security-project/test%d.jpg'),
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
      let mailOptions = {
        from: 'eesecsys@gmail.com',
        to: 'emil.emanuel@hotmail.com',
        subject: 'security breach!',
        text: 'hej'
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err)
        else console.log('Email sent: ' + info.response)
      })
    }
    console.log(data)
  }else {
    console.log(data)
  }
  lastCheck = data.value

}, 1)
