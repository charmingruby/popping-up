import { Either } from '@/core/either'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { ConflictError } from '../errors/conflict-error'
import { Account } from '../../entities/account'

export interface SignUpParams {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignUpResult = Either<
  InvalidCredentialsError | ConflictError,
  {
    account: Account
  }
>

export interface SignUpGateway {
  perform(params: SignUpParams): Promise<SignUpResult>
}
