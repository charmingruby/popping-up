import { Either } from '@/common/core/either'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AccountPayload } from '../logic/account-payload'

export interface SignInParams {
  email: string
  password: string
}

export type SignInResult = Either<
  InvalidCredentialsError,
  {
    accountPayload: AccountPayload
  }
>

export interface SignInGateway {
  perform(params: SignInParams): Promise<SignInResult>
}
