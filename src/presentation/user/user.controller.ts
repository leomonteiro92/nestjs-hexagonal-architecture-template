import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { UserDTO } from 'src/core/user'
import { UserSignUpUseCase } from 'src/use-case/user'
import { BaseController } from '../base.controller'
import { IsPublic } from '../decorators'

@Controller('/users')
export class UserController extends BaseController {
  constructor(private readonly userSignUp: UserSignUpUseCase) {
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
