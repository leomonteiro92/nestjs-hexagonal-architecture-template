import { Module } from '@nestjs/common'
import { BcryptAdapter } from 'src/infra/cryptography'
import {
  HASHER_INTERFACE,
  HASH_COMPARATOR_INTERFACE,
} from 'src/use-case/cryptography'

@Module({
  providers: [
    {
      provide: 'DEFAULT_SALT',
      useValue: 16,
    },
    {
      provide: HASHER_INTERFACE,
      useClass: BcryptAdapter,
    },
    {
      provide: HASH_COMPARATOR_INTERFACE,
      useClass: BcryptAdapter,
    },
    BcryptAdapter,
  ],
  exports: [HASHER_INTERFACE, HASH_COMPARATOR_INTERFACE, 'DEFAULT_SALT'],
})
export class CryptographyModule {}
