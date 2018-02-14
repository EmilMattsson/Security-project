'use strict'

let router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.render('images/images')
  })

module.exports = router
