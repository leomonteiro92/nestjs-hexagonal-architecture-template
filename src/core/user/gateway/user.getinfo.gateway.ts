import { BaseGateway } from 'src/core/base.gateway'
import { UserWithNoPassword } from '../user.model'

export interface UserGetInfoGateway extends BaseGateway {
  execute(email: string): Promise<UserWithNoPassword>
}
