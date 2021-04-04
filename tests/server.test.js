const request = require('supertest')
const app = require('../src/app')
const knex = require('../src/database/knex')
const knexCleaner = require('knex-cleaner')

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

describe('Test basic server functionality', () => {
  it('testing is working', () => {
    expect(true).toBe(true)
  })

  it('returns error on invalid path', async () => {
    const response = await request(app).get('/asd').send()
    expect(response.status).toBe(404)
  })

  it('connects to knex', async () => {
    const result = await knex.select(knex.raw('1'))
    expect(result).toBeTruthy()
  })
})
