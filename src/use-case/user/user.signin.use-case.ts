import { Inject, Injectable } from '@nestjs/common'

import { HashComparator, HASHER_INTERFACE } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import {
  FindUserByEmailPort,
  FIND_USER_BY_EMAIL_PORT,
} from 'src/core/user/ports/find-user-by-email.port'
import { BaseUseCase } from '../base.use-case'

@Injectable()
export class UserSignInUseCase
  implements BaseUseCase<Pick<UserDTO, 'email' | 'password'>, Promise<UserDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_PORT)
    private readonly findUser: FindUserByEmailPort,
    @Inject(HASHER_INTERFACE)
    private readonly hashComparator: HashComparator,
  ) {}

  async execute(params: Pick<UserDTO, 'email' | 'password'>): Promise<UserDTO> {
    const { email, password } = params
    const existingUser = await this.findUser.execute(email)

    if (!existingUser) {
      throw new BusinessException(`User not found with username ${email}`)
    }

    const isValidPassword = await this.hashComparator.compare(
      password,
      existingUser.password,
    )

    if (!isValidPassword) {
      throw new BusinessException('Invalid password, try again')
    }

    return new UserDTO(existingUser)
  }
}
