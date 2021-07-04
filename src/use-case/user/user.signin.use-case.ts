import { Injectable } from '@nestjs/common'

import { HashComparator } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import { BaseUseCase } from '../base.use-case'
import { FindUserPort } from './ports/find-user.port'

@Injectable()
export class UserSignInUseCase
  implements BaseUseCase<UserDTO, Promise<UserDTO>>
{
  constructor(
    private readonly findUser: FindUserPort,
    private readonly hashComparator: HashComparator,
  ) {}

  async execute(params: UserDTO): Promise<UserDTO> {
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
