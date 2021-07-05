import { BusinessException } from 'src/core/exception'
import { CreateUserGateway, FindUserByEmailGateway, User } from 'src/core/user'
import { UserSignUpInteractor } from 'src/use-case/user'
import { Hasher } from '../cryptography'

describe('UserController', () => {
  let interactor: UserSignUpInteractor
  const findUserByEmail: FindUserByEmailGateway = {
    execute: jest.fn(),
  }
  const createUser: CreateUserGateway = {
    execute: jest.fn(),
  }
  const hasher: Hasher = {
    hash: jest.fn(() => Promise.resolve('zyxw')),
  }

  beforeEach(async () => {
    interactor = new UserSignUpInteractor(findUserByEmail, createUser, hasher)
  })

  describe('execute', () => {
    it('should create a user if there is no existing', async () => {
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(null))

      await interactor.execute({
        email: 'test@example.com',
        password: 'wxyz',
      })

      expect(createUser.execute).toHaveBeenCalledTimes(1)
      expect(createUser.execute).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'zyxw',
        blocked: false,
      })
    })

    it('should throw business exception if user not exists', async () => {
      const existingUser: User = {
        id: 'random',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'secret',
        blocked: false,
      }
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(existingUser))

      expect(
        interactor.execute({
          email: 'test@example.com',
          password: 'wxyz',
        }),
      ).rejects.toEqual(new BusinessException('Username already picked'))
    })
  })
})
