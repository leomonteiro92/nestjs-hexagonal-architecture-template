import { HttpStatus } from '@nestjs/common'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { BusinessException } from 'src/core/exception'

@Catch(BusinessException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const statusCode = exception.getCode()

    console.log(exception)

    response.status(HttpStatus.BAD_REQUEST).send({
      message: exception.message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
