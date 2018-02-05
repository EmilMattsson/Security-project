'use strict'

// testing
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: '${/home/emil}/test.jpg',
  width: 640,
  height: 480,
  nopreview: true,
})

myCamera.snap()
  .then((result) => {
    console.log('success!')
  })
  .catch((error) => {
    console.log(error)
  })
