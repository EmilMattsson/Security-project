'use strict';

const RaspiCam = require('raspicam');
const RaspiSensors = require('raspi-sensors')
const nodemailer = require('nodemailer')
let path = require('path')
let Image = require('../models/Image')

// Initilize the database asap
require('../libs/dbHelper').initilize()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eesecsys@gmail.com',
    pass: 'eeee1234'
  }
})

let mailOptions = {
  from: 'eesecsys@gmail.com',
  to: 'emil.emanuel@hotmail.com',
  subject: 'security breach!',
  text: 'hej',
  attachments: [
            {
                filename: 'test.jpg',
                path: '/home/emil/Security-project/test0.jpg'
            },
            {
                filename: 'test1.jpg',
                path: '/home/emil/Security-project/test1.jpg'
            },
            {
                filename: 'test2.jpg',
                path: '/home/emil/Security-project/test2.jpg'
            },
            {
                filename: 'test3.jpg',
                path: '/home/emil/Security-project/test3.jpg'
            },
            {
                filename: 'test4.jpg',
                path: '/home/emil/Security-project/test4.jpg'
            }
        ]
}

var counter = 0;
var camera;
camera = new RaspiCam({
  mode: 'timelapse',
  output: ('/home/emil/Security-project/test%d.jpg'),
  vf: true,
  // exposure: 'night',
  w: 1920,
  h: 1080,
  tl: 1000,
  timeout: 5000
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
    if (lastCheck === 0){
      camera.start()
      lastCheck = 1;
      setTimeout(function(){
        transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.error('Error! ' + err)
        else console.log('Email sent: ' + info.response)
        lastCheck = 0
      })}, 10000);

      let image = new Image
      image.img.data = fs.readFileSync('/home/emil/Security-project/test1.jpg')
      image.img.contentType = 'image/jpg'
      image.save((err, res) => {
        if (err) throw err
        console.log(err)
      })
    }
    console.log(data)
  }else {
    console.log(data)
  }

}, 1)
