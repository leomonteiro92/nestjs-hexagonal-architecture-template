import { User } from '../user.model'

export interface FindUserByEmailPort {
  execute(email: string): Promise<User> | User
}
