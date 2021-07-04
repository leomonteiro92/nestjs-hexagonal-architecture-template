import { User } from '../user.model'

export interface FindUserByEmailPort {
  execute(email: string): Promise<User> | User
}

export const FIND_USER_BY_EMAIL_PORT = 'FindUserByEmailPort'
