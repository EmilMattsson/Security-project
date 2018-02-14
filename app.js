'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let expHbs = require('express-handlebars')
let path = require('path')

let app = express()
let port = process.env.PORT || 8000

// config --------------------------------------------------

// View engine
app.engine('handlebars', expHbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Add support for handling application/json
app.use(bodyParser.json())

// Add support for handling HTML form data
app.use(bodyParser.urlencoded({extended: true}))

// The framework should look in the folder "public" for static resources
app.use(express.static(path.join(__dirname, '/')))

// Load routes as "mini-apps"
app.use('/home', require('./routes/home.js'))
app.use('/images', require('./routes/images.js'))

// Error handling
app.use((req, res, next) => {
  res.status(404).send('error/404')
})

// four parameters for errors
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

// Launch application ---------------------------------------
app.listen(port, () => {
  console.log('Express app listening on port %s!', port)
})