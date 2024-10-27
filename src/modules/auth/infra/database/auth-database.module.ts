import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountsRepository } from '../../domain/application/repositories/accounts.repository'
import { RefreshTokenRepository } from '../security/auth/tokens/refresh-token'
import { TypeOrmAccount } from './typeorm/entities/typeorm-account.entity'
import { TypeOrmRefreshToken } from './typeorm/entities/typeorm-refresh-token.entity'
import { TypeOrmAccountsRepository } from './typeorm/repository/typeorm-accounts.repository'
import { TypeOrmRefreshTokensRepository } from './typeorm/repository/typeorm-refresh-tokens.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAccount, TypeOrmRefreshToken])],
  providers: [
    { useClass: TypeOrmAccountsRepository, provide: AccountsRepository },
    {
      useClass: TypeOrmRefreshTokensRepository,
      provide: RefreshTokenRepository,
    },
  ],
  exports: [AccountsRepository, RefreshTokenRepository],
})
export class AuthDatabaseModule {}
