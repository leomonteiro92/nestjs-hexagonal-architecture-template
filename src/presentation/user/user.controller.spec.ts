import { Test } from '@nestjs/testing'
import { UserSignUpInteractor } from 'src/use-case/user'
import { UserController } from './user.controller'

jest.mock('src/use-case/user/user.signup.interactor')

describe('UserController', () => {
  let controller: UserController
  let signUpInteractor: UserSignUpInteractor

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserSignUpInteractor],
    }).compile()

    controller = moduleRef.get<UserController>(UserController)
    signUpInteractor = moduleRef.get<UserSignUpInteractor>(UserSignUpInteractor)
  })

  describe('signUp', () => {
    it('should create a user by providing user and password', async () => {
      const result = {
        id: 'abc123',
        createdAt: new Date(),
        email: 'test@test.com.br',
        blocked: false,
        password: '123456',
        updatedAt: new Date(),
      }
      jest
        .spyOn(signUpInteractor, 'execute')
        .mockImplementation(() => Promise.resolve(result))

      expect(
        await controller.signUp({
          email: 'test@test.com.br',
          password: '123456',
        }),
      ).toBe(result)
    })
  })
})
