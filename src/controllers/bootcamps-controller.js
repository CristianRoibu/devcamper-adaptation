const knex = require('../database/knex')
// const uuid = require('uuid')

// @desc   GET /api/v1/bootcamps ; Public
exports.get = (req, res, next) => {
  res.status(200).json({ message: 'all bootcamps' })
}

// @desc   GET /api/v1/bootcamps/:uid ; Private
exports.getOne = async (req, res, next) => {
  const { uid } = req.params
  try {
    const result = await knex('bootcamps').where('uid', uid)
    res.status(200).json(result)
  } catch (err) {
    err.message = 'could not find the bootcamp, wrong uid'
    return next(err)
  }
}

// @desc   POST /api/v1/bootcamps  ; Private
exports.post = async (req, res, next) => {
  // const uid = uuid.v4()
  const { uid, name, description } = req.body
  try {
    await knex('bootcamps').insert({ uid, name, description })
    res.status(201).json({ message: 'bootcamp inserted successfully' })
  } catch (err) {
    err.message = 'bootcamp could not be created'
    return next(err)
  }
}

// @desc   PUT /api/v1/bootcamps/:uid  ; Private
exports.put = async (req, res, next) => {
  res.status(200).json({ message: 'path under contruction' })
}

// @desc   DELETE /api/v1/bootcamps/:uid ; Private
exports.del = async (req, res, next) => {
  res.status(200).json({ message: 'path under contruction' })
}
