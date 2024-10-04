import {
  SignUpGateway,
  SignUpParams,
  SignUpResult,
} from '../gateways/sign-up-gateway'
import { EncrypterPort } from '../ports/encrypter'
import { HasherPort } from '../ports/hasher'

export class SignUpCase implements SignUpGateway {
  constructor(
    private readonly encrypter: EncrypterPort,
    private readonly hasher: HasherPort,
  ) {}

  async perform(params: SignUpParams): Promise<SignUpResult> {
    throw new Error('Method not implemented.')
  }
}
