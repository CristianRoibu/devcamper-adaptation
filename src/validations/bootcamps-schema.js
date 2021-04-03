const yup = require('yup')
// const timestampSchema = require('./timestamp-vld')
const isUUID = require('validator/lib/isUUID')

const bootcampsSchema = yup
  .object({
    uid: yup.string().test({
      name: 'uid',
      message: '${path} must be uuid',
      test: (value) => isUUID(value),
    }),
  })
  .noUnknown()
// .concat(timestampSchema)

module.exports = bootcampsSchema
