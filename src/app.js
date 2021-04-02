const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

const server = express()

if (process.env.NODE_ENV === 'development') server.use(morgan('dev'))

server.use(express.json())

server.use('/api/v1', routes)

module.exports = server
