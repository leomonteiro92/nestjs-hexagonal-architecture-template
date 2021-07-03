import { Inject } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGetInfoGateway } from 'src/core/user'
import { USER_GETINFO } from './constants'
import { UserType } from './user.type'

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(USER_GETINFO)
    private readonly userGetInfo: UserGetInfoGateway,
  ) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World'
  }

  @Query(() => UserType)
  getInfo(@Args('email') email: string): Promise<UserType> {
    return this.userGetInfo.execute(email)
  }
}
