import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { HasherPort } from '@/modules/auth/domain/application/ports/hasher.port'

@Injectable()
export class BcryptHasherAdapter implements HasherPort {
  async hash(value: string) {
    const salt = 12
    return await hash(value, salt)
  }

  async compare(value: string, hash: string) {
    return await compare(value, hash)
  }
}
