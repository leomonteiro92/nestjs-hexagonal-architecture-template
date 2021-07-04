import { Body, Controller, Post } from '@nestjs/common'
import { UserDTO } from 'src/core/user'
import { BaseController } from '../base.controller'
import { IsPublic } from '../decorators'
import { AuthenticationDTO } from './authentication.dto'
import { AuthenticationService } from './authentication.service'

@Controller('auth')
export class AuthenticationController extends BaseController {
  constructor(private readonly authenticationService: AuthenticationService) {
    super()
  }

  @IsPublic()
  @Post('/login')
  async login(
    @Body() input: Pick<UserDTO, 'email' | 'password'>,
  ): Promise<AuthenticationDTO> {
    return this.authenticationService.login(input)
  }
}
