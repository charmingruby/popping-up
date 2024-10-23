import { Either } from '@/common/core/either'

import { ConflictException } from '../../../../../common/core/exceptions/conflict.exception'
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception'
import { AccountPayload } from '../logic/account-payload'

export interface SignUpParams {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignUpResult = Either<
  InvalidCredentialsException | ConflictException,
  {
    accountPayload: AccountPayload
  }
>

export abstract class SignUpGateway {
  abstract perform(params: SignUpParams): Promise<SignUpResult>
}
