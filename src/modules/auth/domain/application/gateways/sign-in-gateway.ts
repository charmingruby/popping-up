import { Either } from '@/common/core/either'

import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception'
import { AccountPayload } from '../logic/account-payload'

export interface SignInParams {
  email: string
  password: string
}

export type SignInResult = Either<
  InvalidCredentialsException,
  {
    accountPayload: AccountPayload
  }
>

export abstract class SignInGateway {
  abstract perform(params: SignInParams): Promise<SignInResult>
}
