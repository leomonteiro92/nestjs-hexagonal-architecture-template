import { Injectable } from '@nestjs/common'
import { Hasher } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import { CreateUserPort } from 'src/core/user/ports/create-user.port'
import { BaseUseCase } from '../base.use-case'
import { FindUserPort } from './ports'

@Injectable()
export class UserSignUpUseCase
  implements BaseUseCase<Pick<UserDTO, 'email' | 'password'>, Promise<UserDTO>>
{
  constructor(
    private readonly findUser: FindUserPort,
    private readonly createUser: CreateUserPort,
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
