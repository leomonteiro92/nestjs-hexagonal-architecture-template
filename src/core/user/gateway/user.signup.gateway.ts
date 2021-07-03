import { BaseGateway } from 'src/core/base.gateway'
import { User } from '../user.model'

export interface UserSignUpGateway extends BaseGateway {
  execute(
    params: Pick<User, 'email' | 'password'>,
  ): Promise<Omit<User, 'password'>>
}
