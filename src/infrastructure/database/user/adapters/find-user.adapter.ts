import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/core/user'
import { FindUserByEmailPort } from 'src/core/user/ports/find-user-by-email.port'
import { UserRepository } from '../user.repository'

@Injectable()
export class FindUserByEmailAdapter implements FindUserByEmailPort {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  execute(email: string): Promise<User> {
    return this.repository.findOne({ email })
  }
}
