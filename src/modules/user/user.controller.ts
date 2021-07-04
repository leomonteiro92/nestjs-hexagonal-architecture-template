import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  UserDTO,
  UserSignInGateway,
  UserSignUpGateway,
  USER_SIGNIN,
  USER_SIGNUP,
} from 'src/core/user'
import { BaseController } from '../base.controller'

@Controller('/users')
export class UserController extends BaseController {
  constructor(
    @Inject(USER_SIGNIN)
    private readonly userSignIn: UserSignInGateway,
    @Inject(USER_SIGNUP)
    private readonly userSignUp: UserSignUpGateway,
  ) {
    super()
  }

  @Post('/signup')
  signUp(@Body() input: UserDTO): Promise<UserDTO> {
    return this.userSignUp.execute(input)
  }

  @Post('/signin')
  signIn(@Body() input: UserDTO): Promise<UserDTO> {
    return this.userSignIn.execute(input)
  }
}
