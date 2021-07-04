import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { HttpExceptionFilter } from './http/http-exception.filter'

@SerializeOptions({
  excludeExtraneousValues: true,
  excludePrefixes: ['_'],
})
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export abstract class BaseController {}
