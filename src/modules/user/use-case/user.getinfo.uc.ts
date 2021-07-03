import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BusinessException } from 'src/core/exception'
import { UserGetInfoGateway, UserWithNoPassword } from 'src/core/user'
import { UserRepository } from 'src/database/user/user.repository'

@Injectable()
export class UserGetInfoUC implements UserGetInfoGateway {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserWithNoPassword> {
    const existingUser = await this.repository.findOne({ email })

    if (!existingUser) {
      throw new BusinessException(`User not found with email ${email}`)
    }

    return existingUser
  }
}
