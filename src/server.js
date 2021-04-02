const express = require('express')
const routes = require('./routes')

const server = express()

server.use(express.json())

server.use('/api/v1', routes)

module.exports = server
