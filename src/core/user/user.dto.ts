import { Exclude, Expose } from 'class-transformer'
import { IsBoolean, IsEmail } from 'class-validator'
import { User } from './user.model'

@Exclude()
export class UserDTO implements User {
  @Expose()
  @IsEmail()
  email: string

  _password: string

  blocked: boolean

  @Expose()
  id: string | number

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial)
  }
}
