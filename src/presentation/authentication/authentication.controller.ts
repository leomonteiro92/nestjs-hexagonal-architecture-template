import { Body, Controller, Post } from '@nestjs/common'
import { AuthenticationDTO } from 'src/core/authentication'
import { UserDTO } from 'src/core/user'
import { LoginInteractor } from 'src/use-case/authentication/login.interactor'
import { BaseController } from '../base.controller'
import { IsPublic } from '../decorators'

@Controller('auth')
export class AuthenticationController extends BaseController {
  constructor(private readonly loginUseCase: LoginInteractor) {
    super()
  }

  @IsPublic()
  @Post('/login')
  async login(
    @Body() input: Pick<UserDTO, 'email' | 'password'>,
  ): Promise<AuthenticationDTO> {
    return this.loginUseCase.execute(input)
  }
}
