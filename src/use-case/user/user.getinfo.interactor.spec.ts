import { BusinessException } from 'src/core/exception'
import { FindUserByEmailGateway, User } from 'src/core/user'
import { UserGetInfoInteractor } from './user.getinfo.interactor'

describe('UserController', () => {
  let interactor: UserGetInfoInteractor
  const findUserByEmail: FindUserByEmailGateway = {
    execute: jest.fn(),
  }

  beforeEach(async () => {
    interactor = new UserGetInfoInteractor(findUserByEmail)
  })

  describe('execute', () => {
    it('should return existing user if exists', async () => {
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

      const result = await interactor.execute('test@example.com')

      expect(result).toEqual(existingUser)
    })

    it('should throw business exception if user not exists', async () => {
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(null))

      expect(interactor.execute('test@example.com')).rejects.toEqual(
        new BusinessException('User not found with email test@example.com'),
      )
    })
  })
})
