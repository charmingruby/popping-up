import { Either } from '@/core/either'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UseCaseResult } from '@/core/entities/usecase-result'

export interface SignUpParams {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignUpData {
  accessToken: string
  refreshToken: string
}

export type SignUpResult = UseCaseResult<SignUpData>

export interface SignUpGateway {
  perform(
    params: SignUpParams,
  ): Promise<Either<InvalidCredentialsError, SignUpResult>>
}
