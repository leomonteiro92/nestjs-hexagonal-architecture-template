import { Injectable } from '@nestjs/common'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import { BaseUseCase } from '../base.use-case'
import { FindUserPort } from './ports/find-user.port'

@Injectable()
export class UserGetInfoUseCase
  implements BaseUseCase<string, Promise<UserDTO>>
{
  constructor(private readonly findUserPort: FindUserPort) {}

  async execute(email: string): Promise<UserDTO> {
    const existingUser = await this.findUserPort.execute(email)

    if (!existingUser) {
      throw new BusinessException(`User not found with email ${email}`)
    }

    return new UserDTO(existingUser)
  }
}
