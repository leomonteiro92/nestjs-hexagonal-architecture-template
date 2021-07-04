import { BaseGateway } from 'src/core/base.gateway'
import { User } from '../user.model'

export interface UserSignInGateway extends BaseGateway {
  execute(params: User): Promise<User>
}
