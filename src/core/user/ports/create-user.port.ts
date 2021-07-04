import { User } from '../user.model'

export interface CreateUserPort {
  execute(params: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
}

export const CREATE_USER_PORT = 'CreateUserPort'
