import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGetInfoUseCase } from 'src/use-case/user'
import { GqlAuthGuard } from '../guards/gql-auth.guard'
import { CurrentUser } from '../decorators'
import { UserType } from '.'

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userGetInfo: UserGetInfoUseCase) {}

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
