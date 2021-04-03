const router = require('express').Router()

const bootcamps = require('./bootcamps-router')

router.use(bootcamps)

module.exports = router
