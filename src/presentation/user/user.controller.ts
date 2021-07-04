import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common'
import { UserDTO, UserSignUpGateway, USER_SIGNUP } from 'src/core/user'
import { BaseController } from '../base.controller'
import { IsPublic } from '../decorators'

@Controller('/users')
export class UserController extends BaseController {
  constructor(
    @Inject(USER_SIGNUP)
    private readonly userSignUp: UserSignUpGateway,
  ) {
    super()
  }

  @IsPublic()
  @Post('/signup')
  signUp(@Body() input: UserDTO): Promise<UserDTO> {
    return this.userSignUp.execute(input)
  }

  @Get('/me')
  getProfile(@Request() req): Pick<UserDTO, 'id' | 'email'> {
    return req.user
  }
}
