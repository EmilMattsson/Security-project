'use strict'

let mongoose = require('mongoose')

// Defining the schema
let imageSchema = mongoose.Schema({
  img: { data: Buffer, contentType: String }
})

// Creating model like an object
let Image = mongoose.model('Image', imageSchema)
module.exports = Image
