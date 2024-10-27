import { Injectable } from '@nestjs/common'

import { left, right } from '@/common/core/either'
import { ConflictException } from '@/common/core/exceptions/conflict.exception'

import { Account } from '../../enterprise/entities/account.entity'
import {
  SignUpGateway,
  SignUpParams,
  SignUpResult,
} from '../gateways/sign-up.gateway'
import { AccountPayload } from '../logic/account-payload'
import { HasherPort } from '../ports/hasher.port'
import { AccountsRepository } from '../repositories/accounts.repository'

@Injectable()
export class SignUpUseCase implements SignUpGateway {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly hasher: HasherPort,
  ) {}

  async perform(params: SignUpParams): Promise<SignUpResult> {
    const { firstName, lastName, username, email, password } = params

    const emailAlreadyTaken = await this.accountsRepository.findByEmail(email)
    if (emailAlreadyTaken) {
      return left(new ConflictException('email'))
    }

    const usernameAlreadyTaken =
      await this.accountsRepository.findByUsername(username)
    if (usernameAlreadyTaken) {
      return left(new ConflictException('username'))
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
      accountId: account.id,
      username: account.username,
      email: account.email,
    }

    return right({
      accountPayload,
    })
  }
}
