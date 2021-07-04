import { Expose } from 'class-transformer'

export class AuthenticationDTO {
  @Expose({ name: 'access_token' })
  accessToken: string

  constructor(partial: Partial<AuthenticationDTO>) {
    Object.assign(this, partial)
  }
}
