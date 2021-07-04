import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindUserByEmailGateway, User } from 'src/core/user'
import { UserRepository } from '../user.repository'

@Injectable()
export class FindUserByEmailDbGateway implements FindUserByEmailGateway {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  execute(email: string): Promise<User> {
    return this.repository.findOne({ email })
  }
}
