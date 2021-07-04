import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CREATE_USER_GATEWAY, FIND_USER_BY_EMAIL_GATEWAY } from 'src/core/user'
import { UserGetInfoInteractor, UserSignUpInteractor } from 'src/use-case/user'
import { UserController, UserResolver } from 'src/presentation/user'

import {
  UserRepository,
  FindUserByEmailDbGateway,
  CreateUserDbGateway,
} from 'src/infra/database/user'
import { CryptographyModule } from '../cryptography'

@Module({
  imports: [CryptographyModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    UserResolver,
    UserSignUpInteractor,
    UserGetInfoInteractor,
    {
      provide: FIND_USER_BY_EMAIL_GATEWAY,
      useClass: FindUserByEmailDbGateway,
    },
    {
      provide: CREATE_USER_GATEWAY,
      useClass: CreateUserDbGateway,
    },
  ],
  exports: [FIND_USER_BY_EMAIL_GATEWAY, CREATE_USER_GATEWAY],
})
export class UserModule {}
