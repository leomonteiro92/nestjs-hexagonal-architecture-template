import { Inject, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { HashComparator } from 'src/core/cryptography'
import { User, UserSignInGateway } from 'src/core/user'
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

  async execute(
    params: Pick<User, 'email' | 'password'>,
  ): Promise<Omit<User, 'password'>> {
    const { email, password } = params
    const existingUser = await this.repository.findOne({ email })

    if (!existingUser) {
      throw new Error(`User not found with username ${email}`)
    }

    const isValidPassword = await this.hashComparator.compare(
      password,
      existingUser.password,
    )

    if (!isValidPassword) {
      throw new Error('Invalid password, try again')
    }

    return existingUser
  }
}
