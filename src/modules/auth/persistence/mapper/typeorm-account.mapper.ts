import { Identifier } from '@/common/core/entities/identifier.entity'
import { Account } from '@/modules/auth/core/entities/account.entity'

import { TypeOrmAccount } from '../entities/typeorm-account.entity'

export class TypeOrmAccountMapper {
  static toTypeOrm(account: Account): TypeOrmAccount {
    return {
      id: account.id,
      username: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      refreshTokens: [],
    }
  }

  static toDomain(account: TypeOrmAccount): Account {
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
