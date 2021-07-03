import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpExceptionFilter } from './modules/http/http-exception.filter'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
