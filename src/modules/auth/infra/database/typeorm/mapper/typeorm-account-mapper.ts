import { Identifier } from '@/common/core/entities/identifier'
import { Account } from '@/modules/auth/domain/enterprise/entities/account'

import { TypeORMAccount } from '../entities/typeorm-account'

export class TypeORMAccountMapper {
  static toTypeORM(account: Account): TypeORMAccount {
    return {
      id: account.id,
      username: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }
  }

  static toDomain(account: TypeORMAccount): Account {
    const {
      id,
      firstName,
      lastName,
      username,
      email,
      password,
      createdAt,
      updatedAt,
    } = account

    return Account.create(
      {
        firstName,
        lastName,
        username,
        email,
        password,
        createdAt,
        updatedAt,
      },
      new Identifier(id),
    )
  }
}
