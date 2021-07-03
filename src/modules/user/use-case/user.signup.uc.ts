import { Inject, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { HashComparator } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import {
  UserSignInGateway,
  UserWithNoPassword,
  UserWithRequiredFields,
} from 'src/core/user'
import { UserRepository } from 'src/database/user/user.repository'
import { CryptographyModule } from 'src/modules/cryptography'

@Injectable()
export class UserSignInUC implements UserSignInGateway {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
    @Inject(CryptographyModule.BCRYPT_ADAPTER)
    private readonly hashComparator: HashComparator,
  ) {}

  async execute(params: UserWithRequiredFields): Promise<UserWithNoPassword> {
    const { email, password } = params
    const existingUser = await this.repository.findOne({ email })

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

    return existingUser
  }
}
