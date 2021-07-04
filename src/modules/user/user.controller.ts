import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { UserSignInGateway, UserSignUpGateway } from 'src/core/user'
import { UserDTO } from 'src/core/user/user.dto'
import { USER_SIGNIN, USER_SIGNUP } from './constants'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SIGNIN)
    private readonly userSignIn: UserSignInGateway,
    @Inject(USER_SIGNUP)
    private readonly userSignUp: UserSignUpGateway,
  ) {}

  @Post('/signup')
  signUp(@Body() input: UserDTO): Promise<UserDTO> {
    return this.userSignUp.execute(input)
  }

  @Post('/signin')
  signIn(@Body() input: UserDTO): Promise<UserDTO> {
    return this.userSignIn.execute(input)
  }
}
