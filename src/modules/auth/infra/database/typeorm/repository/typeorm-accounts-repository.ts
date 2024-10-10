import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'
import { Account as DomainAccount } from '@/modules/auth/domain/enterprise/entities/account'

import { TypeORMAccount } from '../entities/typeorm-account'
import { TypeORMAccountMapper } from '../mapper/typeorm-account-mapper'

@Injectable()
export class TypeORMAccountsRepository implements AccountsRepository {
  constructor(
    @InjectRepository(TypeORMAccount)
    private readonly repository: Repository<TypeORMAccount>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.repository.findOneBy({ username })

    if (!user) {
      return null
    }

    return TypeORMAccountMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email })

    if (!user) {
      return null
    }

    return TypeORMAccountMapper.toDomain(user)
  }

  async create(account: DomainAccount) {
    const res = await this.repository.insert(
      TypeORMAccountMapper.toTypeORM(account),
    )
    console.log(res)
  }
}
