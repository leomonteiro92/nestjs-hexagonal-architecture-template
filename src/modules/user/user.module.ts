import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/database/user'
import { CryptographyModule } from '../cryptography'
import { USER_GETINFO, USER_SIGNIN, USER_SIGNUP } from './constants'
import { UserGetInfoUC } from './use-case/user.getinfo.uc'
import { UserSignUpUC } from './use-case/user.signin.uc'
import { UserSignInUC } from './use-case/user.signup.uc'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolve'

@Module({
  imports: [CryptographyModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SIGNIN,
      useClass: UserSignInUC,
    },
    {
      provide: USER_SIGNUP,
      useClass: UserSignUpUC,
    },
    {
      provide: USER_GETINFO,
      useClass: UserGetInfoUC,
    },
    UserResolver,
  ],
})
export class UserModule {}
