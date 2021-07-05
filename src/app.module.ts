import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './infra/modules/user/user.module'
import { AuthenticationModule } from './infra/modules/authentication/authentication.module'
import configuration from './infra/config/configuration'
import { DatabaseModule } from './infra/modules/database/database.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
