import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common'
import { HttpExceptionFilter } from './http/http-exception.filter'

@SerializeOptions({
  excludeExtraneousValues: true,
  excludePrefixes: ['_'],
})
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
export abstract class BaseController {}
