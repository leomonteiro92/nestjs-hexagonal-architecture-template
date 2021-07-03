import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User, UserSignInGateway, UserSignUpGateway } from 'src/core/user';

@Controller('/users')
export class UserController {
  constructor(
    @Inject('user.signIn')
    private readonly userSignIn: UserSignInGateway,
    @Inject('user.signUp')
    private readonly userSignUp: UserSignUpGateway,
  ) {}

  @Post('/signup')
  signUp(@Body() input: User): Promise<Omit<User, 'password'>> {
    return this.userSignUp.execute(input);
  }

  @Post('/signin')
  signIn(@Body() input: User): Promise<Omit<User, 'password'>> {
    return this.userSignIn.execute(input);
  }
}
