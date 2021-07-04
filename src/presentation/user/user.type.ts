import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

import { User } from 'src/core/user'

@ObjectType()
export class UserType implements Omit<User, 'password'> {
  @Field()
  email: string

  @Field({ nullable: true })
  blocked: boolean

  @Field(() => ID)
  id: string | number

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date
}
