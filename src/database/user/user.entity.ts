import { Column, Entity } from 'typeorm'

import { User } from 'src/core/user'
import { CustomBaseEntity } from 'src/database/base.entity'
@Entity('users')
export class UserEntity extends CustomBaseEntity implements User {
  @Column({ unique: true })
  email: string

  @Column({ name: 'password' })
  _password: string

  @Column()
  blocked: boolean
}
