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

const myUUID = uuid.v4()

const validBootcamp = {
  uid: myUUID,
  name: 'my bootcamp',
  description: 'just your average bootcamp',
}

describe('bootcamps functionality', () => {
  it('DB : queries the database', async () => {
    const result = await knex('bootcamps')
    expect(result.length).toBe(0)
  })

  it('DB : queries database for a specific bootcamp', async () => {
    await knex('bootcamps').insert(validBootcamp)
    const result = await knex('bootcamps').where('uid', validBootcamp.uid)
    expect(result.length).toBe(1)
    expect(result[0].uid).toBe(validBootcamp.uid)
  })

  it('GET : fetches a single bootcamp', async () => {
    await knex('bootcamps').insert(validBootcamp)
    const response = await request(app).get(
      '/api/v1/bootcamps/' + validBootcamp.uid
    )
    expect(response.body.length).toBe(1)
  })

  it('POST : introduces new item to database', async () => {
    const response = await request(app)
      .post('/api/v1/bootcamps')
      .send(validBootcamp)
    const query = await knex('bootcamps')
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('bootcamp inserted successfully')
    expect(query[0].uid).toBe(validBootcamp.uid)
  })

  it('DB : error if uuid already present in database', async () => {
    const uid = uuid.v4()
    await request(app)
      .post('/api/v1/bootcamps')
      .send({ ...validBootcamp, uid: uid })
    const response = await request(app)
      .post('/api/v1/bootcamps')
      .send({ ...validBootcamp, uid: uid })
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('uid already present in database')
  })

  const uid_invalid = 'uid : must be type uuid'
  const uid_type = 'uid : must be type uuid'
  const name_type = 'name : must be type string'
  const name_empty = 'name : is required'
  const description_type = 'description : must be type string'
  const description_empty = 'description : is required'

  it.each`
    field            | value        | expectedMessage
    ${'uid'}         | ${'asd'}     | ${uid_invalid}
    ${'uid'}         | ${null}      | ${uid_type}
    ${'name'}        | ${null}      | ${name_type}
    ${'name'}        | ${undefined} | ${name_empty}
    ${'description'} | ${null}      | ${description_type}
    ${'description'} | ${''}        | ${description_empty}
  `(
    'VALIDATION : "$expectedMessage" when $field is $value',
    async ({ field, value, expectedMessage }) => {
      const bootcamp = {
        ...validBootcamp,
        [field]: value,
      }
      const response = await request(app)
        .post('/api/v1/bootcamps')
        .send(bootcamp)
      expect(response.body.message).toBe(expectedMessage)
    }
  )
})
