import { BusinessException } from './business.exception'

export class UnauthorizedException extends BusinessException {
  getCode() {
    return 401
  }
}
