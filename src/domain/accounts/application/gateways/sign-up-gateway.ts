import { Either } from '@/core/either'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export interface SignUpParams {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignUpResult = Either<
  InvalidCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

export interface SignUpGateway {
  perform(params: SignUpParams): Promise<SignUpResult>
}
