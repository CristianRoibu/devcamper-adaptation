const knex = require('../database/knex')

// @desc   GET /api/v1/bootcamps ; Public
exports.get = (req, res, next) => {
  res.status(200).json({ message: 'bootcamps!' })
}

// @desc   GET /api/v1/bootcamps/:uid ; Private
exports.getOne = (req, res, next) => {
  res.status(200).json({ message: 'bootcamp single' })
}

// @desc   POST /api/v1/bootcamps  ; Private
exports.post = async (req, res, next) => {
  const { uid } = req.body
  const result = await knex('bootcamps').insert({ uid: uid })
  res.status(201).json(result)
}

// @desc   PUT /api/v1/bootcamps/:uid  ; Private
exports.put = async (req, res, next) => {
  res.status(200).json({ success: true })
}

// @desc   DELETE /api/v1/bootcamps/:uid ; Private
exports.del = async (req, res, next) => {
  res.status(200).json({ success: true })
}
