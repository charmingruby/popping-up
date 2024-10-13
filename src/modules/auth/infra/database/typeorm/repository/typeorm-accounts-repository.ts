import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'
import { Account as DomainAccount } from '@/modules/auth/domain/enterprise/entities/account'

import { TypeOrmAccount } from '../entities/typeorm-account'
import { TypeOrmAccountMapper } from '../mapper/typeorm-account-mapper'

@Injectable()
export class TypeOrmAccountsRepository implements AccountsRepository {
  constructor(
    @InjectRepository(TypeOrmAccount)
    private readonly repository: Repository<TypeOrmAccount>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.repository.findOneBy({ username })

    if (!user) {
      return null
    }

    return TypeOrmAccountMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email })

    if (!user) {
      return null
    }

    return TypeOrmAccountMapper.toDomain(user)
  }

  async create(account: DomainAccount) {
    await this.repository.insert(TypeOrmAccountMapper.toTypeOrm(account))
  }
}
