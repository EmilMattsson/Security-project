'use strict';

const RaspiCam = require('raspicam');
const RaspiSensors = require('raspi-sensors')
const nodemailer = require('nodemailer')
const fs = require('fs')
// let path = require('path')
// console.log(". = %s", path.resolve("."))
// console.log("__dirname = %s", path.resolve(__dirname))
let Image = require('./models/image')
let mailConfig = require('./config/mail')

// Initilize the database asap
require('./libs/dbHelper.js').initilize()

// Mail configure for sender
let transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass
  }
})

// Mail configure for the mail to be sent
let mailOptions = {
  from: mailConfig.auth.user,
  to: mailConfig.receiver,
  subject: 'Security breach!',
  text: '',
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

// Create camera object
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

// Create a pir sensor object
let pir = new RaspiSensors.Sensor({
  type  : 'PIR',
  pin: 7
}, "pir-sensor")

// Read the data from pir sensor every second
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

      // Wait 10 seconds before sending an email with images recently taken
      setTimeout(function(){
        transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.error('Error! ' + err)
        else console.log('Email sent: ' + info.response)
        lastCheck = 0
      })}, 10000);

      // Wait 15 seconds before uploading images to mongoDB
      setTimeout(() => {
        for (var i = 0; i < 5; i++) {
          let image = new Image
          image.img.data = fs.readFileSync('/home/emil/Security-project/test' + i + '.jpg')
          image.img.contentType = 'image/jpg'
          image.save((err, res) => {
            if (err) throw err
            console.log(err)
          })
        }
      }, 15000)


    }
    console.log(data)
  }else {
    console.log(data)
  }

}, 1)
