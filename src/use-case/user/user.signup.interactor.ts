import { Inject, Injectable } from '@nestjs/common'
import { Hasher, HASHER_INTERFACE } from 'src/use-case/cryptography'
import { BusinessException } from 'src/core/exception'
import {
  CREATE_USER_GATEWAY,
  CreateUserGateway,
  FIND_USER_BY_EMAIL_GATEWAY,
  FindUserByEmailGateway,
  UserDTO,
} from 'src/core/user'
import { Interactor } from '../base.interactor'

@Injectable()
export class UserSignUpInteractor
  implements Interactor<Pick<UserDTO, 'email' | 'password'>, Promise<UserDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_GATEWAY)
    private readonly findUserByEmail: FindUserByEmailGateway,
    @Inject(CREATE_USER_GATEWAY)
    private readonly createUser: CreateUserGateway,
    @Inject(HASHER_INTERFACE)
    private readonly hasher: Hasher,
  ) {}

  async execute(params: Pick<UserDTO, 'email' | 'password'>): Promise<UserDTO> {
    const { email, password } = params
    const userWithSameUsername = await this.findUserByEmail.execute(email)

    if (!!userWithSameUsername) {
      throw new BusinessException('Username already picked')
    }

    const hashedPassword = await this.hasher.hash(password)

    const result = await this.createUser.execute({
      ...params,
      blocked: false,
      password: hashedPassword,
    })

    return new UserDTO(result)
  }
}
