import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/core/user'
import { CreateUserGateway } from 'src/core/user'
import { UserRepository } from '../user.repository'

@Injectable()
export class CreateUserDbGateway implements CreateUserGateway {
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
