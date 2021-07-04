import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/database/user'
import { UserController } from 'src/presentation/user/user.controller'
import { UserResolver } from 'src/presentation/user/user.resolver'
import {
  HASHER_INTERFACE,
  HASH_COMPARATOR_INTERFACE,
} from 'src/core/cryptography'
import { BcryptAdapter } from 'src/infrastructure/cryptography/bcrypt.adapter'
import { UserGetInfoUseCase, UserSignUpUseCase } from 'src/use-case/user'
import { FIND_USER_BY_EMAIL_PORT } from 'src/core/user/ports/find-user-by-email.port'
import { FindUserByEmailAdapter } from 'src/infrastructure/database/user/adapters/find-user.adapter'
import { CREATE_USER_PORT } from 'src/core/user/ports/create-user.port'
import { CreateUserAdapter } from 'src/infrastructure/database/user/adapters/create-user.adapter'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    UserResolver,
    UserSignUpUseCase,
    UserGetInfoUseCase,
    {
      provide: HASHER_INTERFACE,
      useClass: BcryptAdapter,
    },
    {
      provide: HASH_COMPARATOR_INTERFACE,
      useClass: BcryptAdapter,
    },
    {
      provide: 'DEFAULT_SALT',
      useValue: 16,
    },
    {
      provide: FIND_USER_BY_EMAIL_PORT,
      useClass: FindUserByEmailAdapter,
    },
    {
      provide: CREATE_USER_PORT,
      useClass: CreateUserAdapter,
    },
  ],
})
export class UserModule {}
