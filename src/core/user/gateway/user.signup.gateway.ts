import { BaseGateway } from 'src/core/base.gateway'
import { UserWithNoPassword, UserWithRequiredFields } from '../user.model'

export interface UserSignUpGateway extends BaseGateway {
  execute(params: UserWithRequiredFields): Promise<UserWithNoPassword>
}
