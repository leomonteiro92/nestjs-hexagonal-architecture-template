import { BaseModel } from '../base.model'

export interface User extends BaseModel {
  email: string

  password: string

  blocked: boolean
}

export type UserWithNoPassword = Omit<User, 'password'>
export type UserWithRequiredFields = Pick<
  User,
  'email' | 'password' | 'blocked'
>
