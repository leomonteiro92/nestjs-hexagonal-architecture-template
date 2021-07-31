import { APIGatewayProxyResult, Context, Handler } from 'aws-lambda'
import { proxy } from 'aws-serverless-fastify'
import * as fastify from 'fastify'
import { bootstrap } from './app'

let server: fastify.FastifyInstance

export const handler: Handler = async (
  event: any,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!server) {
    server = await bootstrap()
  }
  return await proxy(server, event, context)
}
