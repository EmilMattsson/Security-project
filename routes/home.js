'use strict'

let router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.render('home/index')
  })

module.exports = router
