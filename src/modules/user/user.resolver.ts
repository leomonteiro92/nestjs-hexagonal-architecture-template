import { Inject, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGetInfoGateway, USER_GETINFO } from 'src/core/user'
import { GqlAuthGuard } from '../authentication/guards/gql-auth.guard'
import { CurrentUser } from '../decorators/current-user'
import { UserType } from './user.type'

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(USER_GETINFO)
    private readonly userGetInfo: UserGetInfoGateway,
  ) {}

  @Query(() => UserType)
  getInfo(@Args('email') email: string): Promise<UserType> {
    return this.userGetInfo.execute(email)
  }

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: UserType) {
    return user
  }
}
