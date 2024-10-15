import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'
import { Account } from '@/modules/auth/domain/enterprise/entities/account'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async findById(id: string): Promise<Account | null> {
    const user = this.items.find((account) => account.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((account) => account.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((account) => account.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(account: Account) {
    this.items.push(account)
  }
}
