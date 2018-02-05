'use strict'

var RaspiCam = require('raspicam')

var camera = new RaspiCam({ mode: 'photo', output: '${/home/emil/Security-project}/test%d.jpg' })

camera.start()
