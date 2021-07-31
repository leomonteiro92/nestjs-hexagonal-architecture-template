import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import * as fastify from 'fastify'
import { AppModule } from './app.module'

export async function bootstrap(): Promise<fastify.FastifyInstance> {
  const instance: fastify.FastifyInstance = fastify.fastify({
    logger: true,
  })
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  )

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  await app.init()

  return instance
}
