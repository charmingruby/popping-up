import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountsRepository } from '../../core/application/repositories/accounts.repository'
import { TypeOrmAccount } from '../../persistence/entities/typeorm-account.entity'
import { TypeOrmRefreshToken } from '../../persistence/entities/typeorm-refresh-token.entity'
import { TypeOrmAccountsRepository } from '../../persistence/repository/typeorm-accounts.repository'
import { TypeOrmRefreshTokensRepository } from '../../persistence/repository/typeorm-refresh-tokens.repository'
import { RefreshTokenRepository } from '../security/auth/tokens/refresh-token'

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
