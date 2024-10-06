import { left, right } from '@/core/either'

import { Account } from '../../enterprise/entities/account'
import { ConflictError } from '../errors/conflict-error'
import {
  SignUpGateway,
  SignUpParams,
  SignUpResult,
} from '../gateways/sign-up-gateway'
import { AccountPayload } from '../logic/account-payload'
import { HasherPort } from '../ports/hasher'
import { AccountsRepository } from '../repositories/accounts-repository'

export class SignUpCase implements SignUpGateway {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly hasher: HasherPort,
  ) {}

  async perform(params: SignUpParams): Promise<SignUpResult> {
    const { firstName, lastName, username, email, password } = params

    const emailAlreadyTaken = await this.accountsRepository.findByEmail(email)
    if (emailAlreadyTaken) {
      return left(new ConflictError('email'))
    }

    const usernameAlreadyTaken = await this.accountsRepository.findByUsername(
      username,
    )
    if (usernameAlreadyTaken) {
      return left(new ConflictError('username'))
    }

    const passwordHash = await this.hasher.hash(password)

    const account = Account.create({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    })

    await this.accountsRepository.create(account)

    const accountPayload: AccountPayload = {
      username: account.username,
      email: account.email,
    }

    return right({
      accountPayload,
    })
  }
}
