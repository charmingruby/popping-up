import { AccountsRepository } from '@/domain/accounts/application/repositories/accounts-repository'
import { Account } from '@/domain/accounts/entities/account'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

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
