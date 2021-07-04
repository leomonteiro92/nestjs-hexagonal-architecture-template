import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { USER_SIGNIN } from 'src/core/user'
import { UserRepository } from 'src/database/user'
import { CryptographyModule } from '../cryptography'
import { UserSignInUC } from '../user/use-case/user.signin.uc'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { JWT_EXPIRES_IN, JWT_SECRET } from './constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    CryptographyModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    JwtStrategy,
    AuthenticationService,
    {
      provide: USER_SIGNIN,
      useClass: UserSignInUC,
    },
  ],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
