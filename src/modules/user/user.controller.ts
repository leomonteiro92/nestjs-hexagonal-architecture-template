import { Body, Controller, Inject, Post } from '@nestjs/common'
import { User, UserSignInGateway, UserSignUpGateway } from 'src/core/user'
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
  signUp(@Body() input: User): Promise<Omit<User, 'password'>> {
    return this.userSignUp.execute(input)
  }

  @Post('/signin')
  signIn(@Body() input: User): Promise<Omit<User, 'password'>> {
    return this.userSignIn.execute(input)
  }
}
