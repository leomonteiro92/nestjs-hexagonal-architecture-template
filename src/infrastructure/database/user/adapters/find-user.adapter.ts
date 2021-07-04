import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/core/user'
import { FindUserPort } from 'src/use-case/user'
import { UserRepository } from '../user.repository'

@Injectable()
export class FindUserAdapter implements FindUserPort {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  execute(email: string): Promise<User> {
    return this.repository.findOne({ email })
  }
}
