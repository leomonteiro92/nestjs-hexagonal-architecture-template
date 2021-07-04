import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/database/user'
import { UserController } from 'src/presentation/user/user.controller'
import { UserResolver } from 'src/presentation/user/user.resolver'
import {
  HASHER_INTERFACE,
  HASH_COMPARATOR_INTERFACE,
} from 'src/core/cryptography'
import { BcryptService } from 'src/modules/cryptography'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    UserResolver,
    {
      provide: HASHER_INTERFACE,
      useClass: BcryptService,
    },
    {
      provide: HASH_COMPARATOR_INTERFACE,
      useClass: BcryptService,
    },
    {
      provide: 'DEFAULT_SALT',
      useValue: 16,
    },
  ],
})
export class UserModule {}
