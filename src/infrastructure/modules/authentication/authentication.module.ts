import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HASHER_INTERFACE } from 'src/core/cryptography'
import { FIND_USER_BY_EMAIL_PORT } from 'src/core/user/ports/find-user-by-email.port'
import { UserRepository } from 'src/database/user'
import { BcryptAdapter } from 'src/infrastructure/cryptography/bcrypt.adapter'
import { FindUserByEmailAdapter } from 'src/infrastructure/database/user/adapters/find-user.adapter'
import { AuthenticationController } from 'src/presentation/authentication/authentication.controller'
import { LoginUseCase } from 'src/use-case/authentication/login.use-case'
import { UserSignInUseCase } from 'src/use-case/user'
import { JWT_EXPIRES_IN, JWT_SECRET } from './constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    JwtStrategy,
    {
      provide: FIND_USER_BY_EMAIL_PORT,
      useClass: FindUserByEmailAdapter,
    },
    {
      provide: 'DEFAULT_SALT',
      useValue: 16,
    },
    {
      provide: HASHER_INTERFACE,
      useClass: BcryptAdapter,
    },
    UserSignInUseCase,
    LoginUseCase,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
