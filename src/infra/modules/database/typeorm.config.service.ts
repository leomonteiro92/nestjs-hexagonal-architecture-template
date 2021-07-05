import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment: string = this.config.get<'string'>('environment')
    if (environment !== 'production') {
      return {
        type: 'postgres',
        host: this.config.get<string>('database.host'),
        port: +this.config.get<number>('database.port'),
        username: this.config.get<string>('database.username'),
        password: this.config.get<string>('database.password'),
        database: this.config.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }
    } else {
      return {
        type: 'aurora-data-api-pg',
        database: this.config.get<string>('database.name'),
        secretArn: this.config.get<string>('database.secretArn'),
        resourceArn: this.config.get<string>('database.resourceArn'),
        region: this.config.get<string>('database.region'),
        synchronize: false,
      }
    }
  }
}
