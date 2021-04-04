const uuid = require('uuid')

exports.seed = async (knex) => {
  await knex('bootcamps').del()
  await knex('bootcamps').insert([
    { uid: uuid.v4(), name: 'Bootcamp One', description: 'first bootcamp' },
    { uid: uuid.v4(), name: 'Bootcamp Two', description: 'second bootcamp' },
  ])
}
