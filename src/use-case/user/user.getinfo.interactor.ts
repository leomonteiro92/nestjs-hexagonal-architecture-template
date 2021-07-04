import { Inject, Injectable } from '@nestjs/common'
import { BusinessException } from 'src/core/exception'
import { UserDTO } from 'src/core/user'
import {
  FindUserByEmailGateway,
  FIND_USER_BY_EMAIL_GATEWAY,
} from 'src/core/user'
import { Interactor } from '../base.interactor'

@Injectable()
export class UserGetInfoInteractor
  implements Interactor<string, Promise<UserDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_GATEWAY)
    private readonly findUserByEmail: FindUserByEmailGateway,
  ) {}

  async execute(email: string): Promise<UserDTO> {
    const existingUser = await this.findUserByEmail.execute(email)

    if (!existingUser) {
      throw new BusinessException(`User not found with email ${email}`)
    }

    return new UserDTO(existingUser)
  }
}
