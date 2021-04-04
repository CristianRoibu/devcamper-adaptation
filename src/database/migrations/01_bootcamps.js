exports.up = (knex) => {
  return knex.schema.createTable('bootcamps', (table) => {
    table.uuid('uid').unique().primary().notNullable()
    table.string('name', 50).unique().notNullable()
    table.string('description').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bootcamps')
}
