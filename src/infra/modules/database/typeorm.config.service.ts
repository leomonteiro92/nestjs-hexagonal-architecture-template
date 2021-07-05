import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment: string = this.config.get<'string'>('environment')
    const defaultConfiguration: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.config.get<string>('database.host'),
      port: +this.config.get<number>('database.port'),
      username: this.config.get<string>('database.username'),
      password: this.config.get<string>('database.password'),
      database: this.config.get<string>('database.name'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }
    switch (environment) {
      case 'production':
        return {
          type: 'aurora-data-api-pg',
          database: this.config.get<string>('database.name'),
          secretArn: this.config.get<string>('database.secretArn'),
          resourceArn: this.config.get<string>('database.resourceArn'),
          region: this.config.get<string>('database.region'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
        }
      case 'test':
        return {
          ...defaultConfiguration,
          keepConnectionAlive: true,
          entities: [__dirname, '**/*.entity{.ts,.js}'],
        }
      default:
        return defaultConfiguration
    }
  }
}
