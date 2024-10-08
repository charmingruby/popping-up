import { left, right } from '@/common/core/either'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import {
  SignInGateway,
  SignInParams,
  SignInResult,
} from '../gateways/sign-in-gateway'
import { AccountPayload } from '../logic/account-payload'
import { HasherPort } from '../ports/hasher'
import { AccountsRepository } from '../repositories/accounts-repository'

export class SignInUseCase implements SignInGateway {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly hasher: HasherPort,
  ) {}

  async perform(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params

    const account = await this.accountsRepository.findByEmail(email)
    if (!account) {
      return left(new InvalidCredentialsError())
    }

    const passwordMatches = await this.hasher.compare(
      password,
      account.password,
    )
    if (!passwordMatches) {
      return left(new InvalidCredentialsError())
    }

    const accountPayload: AccountPayload = {
      username: account.username,
      email: account.email,
    }

    return right({
      accountPayload,
    })
  }
}
