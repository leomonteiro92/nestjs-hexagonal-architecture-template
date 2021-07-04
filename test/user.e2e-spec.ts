import { assert } from 'console'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/infra/database/user'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    repository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    )
    await app.init()
  })

  it('/users/signup (GET) should return 200', (done) => {
    const testEmail = 'test@example.com'
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: testEmail,
        password: '123456',
      })
      .expect(200)
      .then(({ body }) => {
        assert(body.email, testEmail)
        done()
      })
  })

  it('/users/signup (GET) with email existing should return 400', async (done) => {
    const existingUser = await repository.save({
      email: 'test2@example.com',
      password: '',
      blocked: false,
    })
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: existingUser.email,
        password: existingUser.password,
      })
      .expect(400)
      .expect(({ body }) => {
        assert(body.message, 'Username already picked')
        done()
      })
  })
})
