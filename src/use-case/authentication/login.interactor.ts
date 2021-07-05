import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthenticationDTO } from 'src/core/authentication'
import { User } from 'src/core/user'
import {
  FindUserByEmailGateway,
  FIND_USER_BY_EMAIL_GATEWAY,
} from 'src/core/user'
import { Interactor } from '../base.interactor'
import { HashComparator, HASHER_INTERFACE } from '../cryptography'

@Injectable()
export class LoginInteractor
  implements
    Interactor<Pick<User, 'email' | 'password'>, Promise<AuthenticationDTO>>
{
  constructor(
    @Inject(FIND_USER_BY_EMAIL_GATEWAY)
    private readonly findUserByEmail: FindUserByEmailGateway,
    @Inject(HASHER_INTERFACE)
    private readonly hashComparator: HashComparator,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    params: Pick<User, 'email' | 'password'>,
  ): Promise<AuthenticationDTO> {
    const { email, password } = params
    const existingUser = await this.findUserByEmail.execute(email)

    if (!existingUser) {
      throw new UnauthorizedException(`User not found with username ${email}`)
    }

    const isValidPassword = await this.hashComparator.compare(
      password,
      existingUser.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password, try again')
    }

    const accessToken = this.jwtService.sign({
      sub: existingUser.id,
      email: existingUser.email,
    })

    return new AuthenticationDTO({ accessToken })
  }
}
