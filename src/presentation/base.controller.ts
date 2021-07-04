import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from './guards'
import { HttpExceptionFilter } from './filters'

@SerializeOptions({
  excludeExtraneousValues: true,
  excludePrefixes: ['_'],
})
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export abstract class BaseController {}
