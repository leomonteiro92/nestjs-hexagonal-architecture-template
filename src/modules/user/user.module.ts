import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/database/user'
import { USER_GETINFO, USER_SIGNUP } from 'src/core/user'
import { CryptographyModule } from '../cryptography'
import { UserGetInfoUC } from './use-case/user.getinfo.uc'
import { UserSignUpUC } from './use-case/user.signup.uc'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'

@Module({
  imports: [CryptographyModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
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
