import { Column, Entity } from 'typeorm'

import { User } from 'src/core/user'
import { CustomBaseEntity } from 'src/database/base.entity'
import { Exclude } from 'class-transformer'
@Entity('users')
export class UserEntity extends CustomBaseEntity implements User {
  @Column({ unique: true })
  email: string

  @Exclude()
  @Column({ name: 'password' })
  password: string

  @Column()
  blocked: boolean
}
