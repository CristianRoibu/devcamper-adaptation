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
  it('testng is working', () => {
    expect(true).toBe(true)
  })

  it('reaches the root path', async () => {})

  it('connects to knex', async () => {
    const result = await knex.select(knex.raw('1'))
    expect(result).toBeTruthy()
  })
})
