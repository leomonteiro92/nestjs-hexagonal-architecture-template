import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

import { User } from 'src/core/user'

@ObjectType()
export class UserType implements Omit<User, 'password'> {
  @Field()
  email: string

  @Field()
  blocked: boolean

  @Field(() => ID)
  id: string | number

  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
