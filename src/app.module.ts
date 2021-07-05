import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { ConfigModule } from '@nestjs/config'
import { UserModule } from './infra/modules/user/user.module'
import { AuthenticationModule } from './infra/modules/authentication/authentication.module'
import { DatabaseModule } from './infra/modules/database'
import configuration from './infra/config/configuration'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
      load: [configuration],
    }),
    DatabaseModule,
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
