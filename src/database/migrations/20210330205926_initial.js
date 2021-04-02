exports.up = (knex) => {
  return knex.schema.createTable('bootcamps', (table) => {
    table.uuid('uid').unique().primary().notNullable()
    table.timestamps(true, true)
  })

  // createTable('another', (table) => {})
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bootcamps')
}
