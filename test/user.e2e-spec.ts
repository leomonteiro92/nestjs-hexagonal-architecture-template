import { assert } from 'console'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { Connection, Repository } from 'typeorm'
import { UserEntity, UserRepository } from 'src/infra/database/user'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let conn: Connection
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )
    conn = moduleFixture.get<Connection>(Connection)
    repository = moduleFixture.get<UserRepository>(UserRepository)
    await app.init()
  })

  afterEach(() => {
    repository.clear()
  })

  afterAll(() => {
    conn.close()
    app.close()
  })

  it('/users/signup (GET) should return 200', async (done) => {
    const testEmail = 'test@example.com'
    const res = await app.inject({
      method: 'POST',
      url: '/users/signup',
      payload: {
        email: testEmail,
        password: '123456',
      },
    })
    expect(res.statusCode).toEqual(201)
    const body = JSON.parse(res.body)
    expect(body.email).toEqual(testEmail)
    done()
  })

  it('/users/signup (GET) with email existing should return 400', async (done) => {
    const existingUser = await repository.save({
      email: 'test2@example.com',
      password: '',
      blocked: false,
    })
    const res = await app.inject({
      method: 'POST',
      url: '/users/signup',
      payload: {
        email: existingUser.email,
        password: existingUser.password,
      },
    })
    expect(res.statusCode).toEqual(400)
    const body = JSON.parse(res.body)
    expect(body.message).toEqual('Username already picked')
    done()
  })
})
