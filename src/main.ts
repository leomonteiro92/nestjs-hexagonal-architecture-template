import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(new Reflector(), {
      excludeExtraneousValues: true,
      excludePrefixes: ['_'],
    }),
  )

  await app.listen(3000, '0.0.0.0')
}

bootstrap()
