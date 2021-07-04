import { Column, Entity } from 'typeorm'

import { User } from 'src/core/user'
import { CustomBaseEntity } from 'src/database/base.entity'
@Entity('users')
export class UserEntity extends CustomBaseEntity implements User {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  blocked: boolean
}
