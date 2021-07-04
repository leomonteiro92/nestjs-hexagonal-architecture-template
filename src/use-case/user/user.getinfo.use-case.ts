import { Inject, Injectable } from '@nestjs/common'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import {
  FindUserByEmailPort,
  FIND_USER_BY_EMAIL_PORT,
} from 'src/core/user/ports/find-user-by-email.port'
import { BaseUseCase } from '../base.use-case'

@Injectable()
export class UserGetInfoUseCase
  implements BaseUseCase<string, Promise<UserDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_PORT)
    private readonly findUserPort: FindUserByEmailPort,
  ) {}

  async execute(email: string): Promise<UserDTO> {
    const existingUser = await this.findUserPort.execute(email)

    if (!existingUser) {
      throw new BusinessException(`User not found with email ${email}`)
    }

    return new UserDTO(existingUser)
  }
}
