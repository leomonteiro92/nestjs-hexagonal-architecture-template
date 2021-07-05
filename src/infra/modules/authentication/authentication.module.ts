import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/infra/database/user'
import { AuthenticationController } from 'src/presentation/authentication'
import { LoginUseCase } from 'src/use-case/authentication/login.interactor'
import { ConfigService } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { CryptographyModule } from '../cryptography'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    CryptographyModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtSecret'),
        signOptions: { expiresIn: config.get<string>('jwtExpiresIn') },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [JwtStrategy, LoginUseCase],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
