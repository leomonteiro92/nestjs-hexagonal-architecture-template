import { Inject, Injectable } from '@nestjs/common'
import { Hasher, HASHER_INTERFACE } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import {
  CreateUserPort,
  CREATE_USER_PORT,
} from 'src/core/user/ports/create-user.port'
import {
  FindUserByEmailPort,
  FIND_USER_BY_EMAIL_PORT,
} from 'src/core/user/ports/find-user-by-email.port'
import { BaseUseCase } from '../base.use-case'

@Injectable()
export class UserSignUpUseCase
  implements BaseUseCase<Pick<UserDTO, 'email' | 'password'>, Promise<UserDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_PORT)
    private readonly findUser: FindUserByEmailPort,
    @Inject(CREATE_USER_PORT)
    private readonly createUser: CreateUserPort,
    @Inject(HASHER_INTERFACE)
    private readonly hasher: Hasher,
  ) {}

  async execute(params: Pick<UserDTO, 'email' | 'password'>): Promise<UserDTO> {
    const { email, password } = params
    const userWithSameUsername = await this.findUser.execute(email)

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
