import { Inject } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-errors'
import { UserGetInfoGateway, USER_GETINFO } from 'src/core/user'
import { UserType } from './user.type'

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(USER_GETINFO)
    private readonly userGetInfo: UserGetInfoGateway,
  ) {}

  @Query(() => UserType)
  getInfo(@Args('email') email: string): Promise<UserType> {
    try {
      return this.userGetInfo.execute(email)
    } catch (err) {
      console.log(err)
      throw new ApolloError(err.message)
    }
  }
}
