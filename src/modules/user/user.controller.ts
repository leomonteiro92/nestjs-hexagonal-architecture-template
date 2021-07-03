import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  UserSignInGateway,
  UserSignUpGateway,
  UserWithNoPassword,
  UserWithRequiredFields,
} from 'src/core/user'
import { USER_SIGNIN, USER_SIGNUP } from './constants'

@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SIGNIN)
    private readonly userSignIn: UserSignInGateway,
    @Inject(USER_SIGNUP)
    private readonly userSignUp: UserSignUpGateway,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() input: UserWithRequiredFields,
  ): Promise<UserWithNoPassword> {
    const result = await this.userSignUp.execute(input)
    return result as UserWithNoPassword
  }

  @Post('/signin')
  async signIn(
    @Body() input: UserWithRequiredFields,
  ): Promise<UserWithNoPassword> {
    const result = await this.userSignIn.execute(input)
    return result as UserWithNoPassword
  }
}
