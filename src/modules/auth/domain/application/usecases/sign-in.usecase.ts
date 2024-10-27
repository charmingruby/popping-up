import { Injectable } from '@nestjs/common'

import { left, right } from '@/common/core/either'

import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception'
import {
  SignInGateway,
  SignInParams,
  SignInResult,
} from '../gateways/sign-in.gateway'
import { AccountPayload } from '../logic/account-payload'
import { HasherPort } from '../ports/hasher.port'
import { AccountsRepository } from '../repositories/accounts.repository'

@Injectable()
export class SignInUseCase implements SignInGateway {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly hasher: HasherPort,
  ) {}

  async perform(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params

    const account = await this.accountsRepository.findByEmail(email)
    if (!account) {
      return left(new InvalidCredentialsException())
    }

    const passwordMatches = await this.hasher.compare(
      password,
      account.password,
    )
    if (!passwordMatches) {
      return left(new InvalidCredentialsException())
    }

    const accountPayload: AccountPayload = {
      accountId: account.id,
      username: account.username,
      email: account.email,
    }

    return right({
      accountPayload,
    })
  }
}
