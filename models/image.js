'use strict'

let mongoose = require('mongoose')

// Defining the schema
let imageSchema = mongoose.Schema({
  img: { data: Buffer, contentType: String },
  date: { }
})
