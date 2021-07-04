import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/core/user'
import { CreateUserPort } from 'src/core/user/ports/create-user.port'
import { UserRepository } from '../user.repository'

@Injectable()
export class CreateUserAdapter implements CreateUserPort {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  execute(params: Omit<User, 'id'>): Promise<User> {
    return this.repository.save(params, {
      reload: true,
    })
  }
}
