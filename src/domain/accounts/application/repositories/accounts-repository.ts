import { Account } from '../../entities/account'

export abstract class AccountRepository {
  abstract findByUsername(username: string): Promise<Account | null>
  abstract findByEmail(email: string): Promise<Account | null>
  abstract create(account: Account): Promise<void>
}
