import { User } from '../user.model'

export interface CreateUserGateway {
  execute(params: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
}

export const CREATE_USER_GATEWAY = 'CreateUserPort'
