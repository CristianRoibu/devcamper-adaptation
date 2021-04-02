const request = require('supertest')
const app = require('../src/app')
const knex = require('../src/database/knex')
const knexCleaner = require('knex-cleaner')
const uuid = require('uuid')

beforeAll(async () => {
  await knex.migrate.latest()
  // await knex.seed.run()
})
beforeEach(async () => {
  // await knex('test').truncate()
  await knexCleaner.clean(knex)
})
afterAll(async () => {
  await knex.migrate.rollback()
  await knex.destroy()
})

describe('bootcamps functionality', () => {
  it('inserts into database', async () => {
    const id = uuid.v4()
    const result = await knex('bootcamps').insert({ uid: id })
    expect(result[0]).toBe(1)
  })

  it('queries the database', async () => {
    const id = uuid.v4()
    await knex('bootcamps').insert({ uid: id })
    const result = await knex('bootcamps').where('uid', id)

    expect(result[0].uid).toBe(id)
  })

  it('POST /bootcamps introduces new item to database', async () => {
    const id = uuid.v4()
    const result = await request(app)
      .post('/api/v1/bootcamps')
      .send({ uid: id })
    const query = await knex('bootcamps')
    expect(result.status).toBe(201)
    expect(result.body[0]).toBe(1)
    expect(query[0].uid).toBe(id)
  })
})
