const router = require('express').Router()

const bootcamps = require('./bootcamps-rtr')

router.use(bootcamps)

module.exports = router
