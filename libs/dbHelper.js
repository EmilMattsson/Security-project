'use strict'

let mongoose = require('mongoose')
module.exports = {
  initilize: function () {
    let db = mongoose.connection

    db.on('error', function () {
      console.error('Error with connecting to mongoDB')
    })

    db.once('open', function () {
      console.log('Successfully connected to mongoDB')
    })

    process.on('SIGINT', function () {
      db.close(function () {
        console.log('Mongoose connection disconnected through app termination.')
        process.exit(0)
      })
    })

    mongoose.connect('mongodb://emil:e123@ds133017.mlab.com:33017/security-images')
  }
}
