import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthenticationDTO } from 'src/core/authentication'
import { User } from 'src/core/user'
import { BaseUseCase } from '../base.use-case'
import { UserSignInUseCase } from '../user'

@Injectable()
export class LoginUseCase
  implements
    BaseUseCase<Pick<User, 'email' | 'password'>, Promise<AuthenticationDTO>>
{
  constructor(
    private readonly userSignIn: UserSignInUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    params: Pick<User, 'email' | 'password'>,
  ): Promise<AuthenticationDTO> {
    const existingUser = await this.userSignIn.execute(params)

    const accessToken = this.jwtService.sign({
      sub: existingUser.id,
      email: existingUser.email,
    })

    return new AuthenticationDTO({ accessToken })
  }
}
