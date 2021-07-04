import { User } from 'src/core/user'

export interface CreateUserPort {
  execute(input: Partial<User>): Promise<User> | User
}
