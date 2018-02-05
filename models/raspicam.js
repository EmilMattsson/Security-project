'use strict'

var RaspiCam = require('raspicam')

// vf = vertical flip - flipping the camera because it's upside down for some reason
var camera = new RaspiCam({
  mode: 'photo',
  output: '/home/emil/Security-project/test.jpg',
  vf: true,
  exposure: 'night',
  w: 1920,
  h: 1080
})
camera.start()
