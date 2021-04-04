const validation = (schema) => async (req, res, next) => {
  const { body } = req
  try {
    await schema.validate(body)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = validation
