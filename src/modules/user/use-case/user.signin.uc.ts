import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hasher } from 'src/core/cryptography'
import { BusinessException } from 'src/core/exception'
import { User, UserSignUpGateway } from 'src/core/user'
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

  async execute(
    params: Pick<User, 'email' | 'password'>,
  ): Promise<Omit<User, 'password'>> {
    const { email, password } = params
    const userWithSameUsername = await this.repository.findOne({ email })

    if (!!userWithSameUsername) {
      throw new BusinessException('Username already picked')
    }

    const hashedPassword = await this.hasher.hash(password)

    const result = await this.repository.save({
      ...params,
      password: hashedPassword,
    })

    return result
  }
}
