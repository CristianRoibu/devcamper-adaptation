const router = require('express').Router()
const ctrl = require('../controllers').bootcamps

// prettier-ignore
router.route('/bootcamps')
  .get(ctrl.get)
  .post(ctrl.post)

// prettier-ignore
router.route('/bootcamps/:uid')
  .get(ctrl.getOne)
  .put(ctrl.put)
  .delete(ctrl.del)

module.exports = router
