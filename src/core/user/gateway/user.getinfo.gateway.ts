import { BaseGateway } from 'src/core/base.gateway'
import { User } from '../user.model'

export interface UserGetInfoGateway extends BaseGateway {
  execute(email: string): Promise<User>
}
