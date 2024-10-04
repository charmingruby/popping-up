import {
  SignUpGateway,
  SignUpParams,
  SignUpResult,
} from '../gateways/sign-up-gateway'
import { EncrypterPort } from '../ports/encrypter'
import { HasherPort } from '../ports/hasher'
import { AccountRepository } from '../repositories/account-repositories'

export class SignUpCase implements SignUpGateway {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly encrypter: EncrypterPort,
    private readonly hasher: HasherPort,
) {}

  async perform(params: SignUpParams): Promise<SignUpResult> {
    throw new Error('Method not implemented.')
  }
}
