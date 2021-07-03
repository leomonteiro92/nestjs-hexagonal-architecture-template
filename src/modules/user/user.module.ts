import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/user/user.repository';
import { CryptographyModule } from '../cryptography';
import { UserSignUpUC } from './use-case/user.signin.uc';
import { UserSignInUC } from './use-case/user.signup.uc';
import { UserController } from './user.controller';

@Module({
  imports: [CryptographyModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    {
      provide: 'user.signIn',
      useClass: UserSignInUC,
    },
    {
      provide: 'user.signUp',
      useClass: UserSignUpUC,
    },
  ],
})
export class UserModule {}
