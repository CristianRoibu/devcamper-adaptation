const yup = require('yup')
// const timestampSchema = require('./timestamp-schema')
const isUUID = require('validator/lib/isUUID')

const bootcampsSchema = yup
  .object({
    uid: yup
      .string()
      .typeError('${path} : must be type uuid')
      .test({
        name: 'uid',
        message: '${path} : must be type uuid',
        test: (value) => (value ? isUUID(value) : true),
      }),
    name: yup
      .string()
      .typeError('${path} : must be type ${type}')
      .required('${path} : is required')
      .max(50)
      .trim(),
    description: yup
      .string()
      .typeError('${path} : must be type ${type}')
      .required('${path} : is required'),
  })
  .noUnknown()
// .concat(timestampSchema)

module.exports = bootcampsSchema
