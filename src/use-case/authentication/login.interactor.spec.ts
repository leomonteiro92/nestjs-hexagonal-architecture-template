import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FindUserByEmailGateway, User } from 'src/core/user'
import { HashComparator } from '../cryptography'
import { LoginInteractor } from './login.interactor'

describe('UserController', () => {
  let interactor: LoginInteractor
  const findUserByEmail: FindUserByEmailGateway = {
    execute: jest.fn(),
  }
  const hashComparator: HashComparator = {
    compare: jest.fn(),
  }

  beforeEach(async () => {
    interactor = new LoginInteractor(
      findUserByEmail,
      hashComparator,
      new JwtService({
        secret: 'dummy',
      }),
    )
  })

  describe('execute', () => {
    const existingUser: User = {
      id: 'random',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'secret',
      blocked: false,
    }
    it('should return a signed access token if user exists and credentials are correct', async () => {
      jest
        .spyOn(hashComparator, 'compare')
        .mockImplementation(() => Promise.resolve(true))
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(existingUser))

      const result = await interactor.execute({
        email: 'test@example.com',
        password: 'wxyz',
      })

      expect(result.accessToken).toBeTruthy()
    })

    it('should throw unauthorized exception if user not found', async () => {
      jest
        .spyOn(hashComparator, 'compare')
        .mockImplementation(() => Promise.resolve(true))
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(null))

      expect(
        interactor.execute({
          email: 'test@example.com',
          password: 'abcd',
        }),
      ).rejects.toEqual(
        new UnauthorizedException(
          'User not found with username test@example.com',
        ),
      )
    })

    it('should throw unauthorized exception if credentials are wrong', async () => {
      const existingUser: User = {
        id: 'random',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'secret',
        blocked: false,
      }
      jest
        .spyOn(hashComparator, 'compare')
        .mockImplementation(() => Promise.resolve(false))
      jest
        .spyOn(findUserByEmail, 'execute')
        .mockImplementation(() => Promise.resolve(existingUser))

      expect(
        interactor.execute({
          email: 'test@example.com',
          password: 'abcd',
        }),
      ).rejects.toEqual(
        new UnauthorizedException('Invalid password, try again'),
      )
    })
  })
})
