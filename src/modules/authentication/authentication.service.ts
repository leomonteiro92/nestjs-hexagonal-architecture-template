import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserDTO, UserSignInGateway, USER_SIGNIN } from 'src/core/user'
import { AuthenticationDTO } from './authentication.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_SIGNIN)
    private readonly userSignIn: UserSignInGateway,
  ) {}

  async login(
    user: Pick<UserDTO, 'email' | 'password'>,
  ): Promise<AuthenticationDTO> {
    const existingUser = await this.userSignIn.execute(user)

    const accessToken = this.jwtService.sign({
      sub: existingUser.id,
      email: existingUser.email,
    })

    return new AuthenticationDTO({ accessToken })
  }
}
