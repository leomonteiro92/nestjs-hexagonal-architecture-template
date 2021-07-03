import { Module } from '@nestjs/common'
import { BcryptService } from './bcrypt.service'

@Module({
  providers: [
    {
      provide: CryptographyModule.DEFAULT_SALT,
      useValue: 16,
    },
    {
      provide: CryptographyModule.BCRYPT_ADAPTER,
      useClass: BcryptService,
    },
  ],
  exports: [CryptographyModule.DEFAULT_SALT, CryptographyModule.BCRYPT_ADAPTER],
})
export class CryptographyModule {
  static DEFAULT_SALT = 'DEFAULT_SALT'
  static BCRYPT_ADAPTER = 'BCRYTP_ADAPTER'
}
