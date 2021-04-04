const router = require('express').Router()
const ctrl = require('../controllers/bootcamps-controller')

const validation = require('../middlewares/validation')
const bootcampsSchema = require('../validations/bootcamps-schema')

router.get('/bootcamps', ctrl.get)

router.get('/bootcamps/:uid', ctrl.getOne)

router.post('/bootcamps', validation(bootcampsSchema), ctrl.post)

router.put('/bootcamps/:uid', ctrl.put)

router.delete('/bootcamps/:uid', ctrl.del)

module.exports = router
