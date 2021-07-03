import { BaseModel } from '../base.model'

export interface User extends BaseModel {
  email: string

  _password: string

  blocked: boolean
}

export type UserWithNoPassword = Omit<User, '_password'>

export type UserWithRequiredFields = Pick<
  User,
  'email' | '_password' | 'blocked'
>
