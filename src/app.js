const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

const server = express()

if (process.env.NODE_ENV === 'development') server.use(morgan('dev'))

server.use(express.json())

server.use('/api/v1', routes)

server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = server
