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
  signUp(@Body() input: UserWithRequiredFields): Promise<UserWithNoPassword> {
    return this.userSignUp.execute(input)
  }

  @Post('/signin')
  signIn(@Body() input: UserWithRequiredFields): Promise<UserWithNoPassword> {
    return this.userSignIn.execute(input)
  }
}
