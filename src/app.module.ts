import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { UserModule } from './infrastructure/modules/user/user.module'
import { AuthenticationModule } from './infrastructure/modules/authentication/authentication.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    AuthenticationModule,
    UserModule,
  ],
})
export class AppModule {}
