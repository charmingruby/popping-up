import { Either } from '@/common/core/either'

import { ConflictError } from '../errors/conflict-error'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AccountPayload } from '../logic/account-payload'

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
    accountPayload: AccountPayload
  }
>

export interface SignUpGateway {
  perform(params: SignUpParams): Promise<SignUpResult>
}
