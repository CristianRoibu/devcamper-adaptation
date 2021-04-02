const uuid = require('uuid')

const id1 = uuid.v4()
const id2 = uuid.v4()

exports.seed = async (knex) => {
  await knex('bootcamps').del()
  await knex('bootcamps').insert([{ uid: id1 }, { uid: id2 }])
}
