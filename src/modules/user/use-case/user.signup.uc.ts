import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hasher } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import {
  UserSignUpGateway,
  UserWithNoPassword,
  UserWithRequiredFields,
} from 'src/core/user'
import { UserRepository } from 'src/database/user/user.repository'
import { CryptographyModule } from 'src/modules/cryptography'

@Injectable()
export class UserSignUpUC implements UserSignUpGateway {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
    @Inject(CryptographyModule.BCRYPT_ADAPTER)
    private readonly hasher: Hasher,
  ) {}

  async execute(params: UserWithRequiredFields): Promise<UserWithNoPassword> {
    const { email, _password } = params
    const userWithSameUsername = await this.repository.findOne({ email })

    if (!!userWithSameUsername) {
      throw new BusinessException('Username already picked')
    }

    const hashedPassword = await this.hasher.hash(_password)

    const result = await this.repository.save({
      ...params,
      _password: hashedPassword,
    })

    return result
  }
}
