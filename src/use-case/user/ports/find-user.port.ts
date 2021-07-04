import { User } from 'src/core/user'

export interface FindUserPort {
  execute(email: string): Promise<User>
}
