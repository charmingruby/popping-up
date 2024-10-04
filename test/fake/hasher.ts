import { HasherPort } from '@/domain/accounts/application/ports/hasher'

export class FakeHasher implements HasherPort {
  private generateHash(value) {
    return `hash-${value}`
  }

  async hash(value: string) {
    return this.generateHash(value)
  }

  async compare(value: string, hash: string) {
    return this.generateHash(value) === hash
  }
}
