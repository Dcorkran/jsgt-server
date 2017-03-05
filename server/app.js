const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors');

const index = require('./routes/index')
const users = require('./routes/users')
const tutorial = require('./api/v1/tutorial')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/../client')))   // <--- #1
app.use(cors());

app.use('/api/v1', index)
app.use('/api/v1', users)
app.use('/api/v1/tutorial', tutorial)

app.use('*', function (req, res) {                            // <--- #2
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client')
  })
})

app.use(function(err, req, res, next) {                       // <--- #3
  const response = { message: err.message }
  if (req.app.get('env') === 'development') {
    response.stack = err.stack
  }

  res.status(err.status || 500).json(response)
})

module.exports = app
