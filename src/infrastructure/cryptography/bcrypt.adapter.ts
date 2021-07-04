import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { HashComparator, Hasher } from 'src/core/cryptography'

@Injectable()
export class BcryptAdapter implements Hasher, HashComparator {
  constructor(
    @Inject('DEFAULT_SALT')
    private readonly salt: number,
  ) {}

  compare(plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }

  hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }
}
