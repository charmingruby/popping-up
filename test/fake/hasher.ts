import { HasherPort } from '@/domain/auth/application/ports/hasher'

export class FakeHasher implements HasherPort {
  private generateHash(value: string) {
    return `hash-${value}`
  }

  async hash(value: string) {
    return this.generateHash(value)
  }

  async compare(value: string, hash: string) {
    return this.generateHash(value) === hash
  }
}
