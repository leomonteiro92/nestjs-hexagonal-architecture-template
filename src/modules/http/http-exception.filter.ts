import { HttpStatus } from '@nestjs/common'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { BusinessException } from 'src/core/exception'

@Catch(BusinessException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const statusCode = exception.getCode()

    response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
