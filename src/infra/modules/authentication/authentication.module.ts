import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/infra/database/user'
import { AuthenticationController } from 'src/presentation/authentication'
import { LoginUseCase } from 'src/use-case/authentication/login.interactor'
import { UserModule } from '../user/user.module'
import { CryptographyModule } from '../cryptography'
import { JWT_EXPIRES_IN, JWT_SECRET } from './constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    CryptographyModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [JwtStrategy, LoginUseCase],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
