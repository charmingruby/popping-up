import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  RefreshToken,
  RefreshTokenRepository,
} from '../../../security/auth/tokens/refresh-token'
import { TypeOrmRefreshToken } from '../entities/typeorm-refresh-token.entity'

@Injectable()
export class TypeOrmRefreshTokensRepository implements RefreshTokenRepository {
  constructor(
    @InjectRepository(TypeOrmRefreshToken)
    private readonly repository: Repository<TypeOrmRefreshToken>,
  ) {}

  async findByAccountId(accountId: string): Promise<RefreshToken | null> {
    const refreshToken = await this.repository.findOne({
      where: {
        account: { id: accountId },
      },
      relations: ['account'],
    })

    if (!refreshToken) {
      return null
    }

    return {
      id: refreshToken.id,
      accountId: refreshToken.account.id,
      expiresAt: refreshToken.expiresAt,
      issuedAt: refreshToken.issuedAt,
      createdAt: refreshToken.createdAt,
    }
  }

  async findById(id: string) {
    const refreshToken = await this.repository.findOne({
      where: { id },
      relations: ['account'],
    })

    if (!refreshToken) {
      return null
    }

    return {
      id: refreshToken.id,
      accountId: refreshToken.account.id,
      expiresAt: refreshToken.expiresAt,
      issuedAt: refreshToken.issuedAt,
      createdAt: refreshToken.createdAt,
    }
  }

  async create({
    id,
    accountId,
    expiresAt,
    issuedAt,
    createdAt,
  }: RefreshToken) {
    await this.repository.insert({
      id,
      account: { id: accountId },
      expiresAt,
      issuedAt,
      createdAt,
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
