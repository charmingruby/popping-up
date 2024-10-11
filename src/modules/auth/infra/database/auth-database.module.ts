import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountsRepository } from '../../domain/application/repositories/accounts-repository'
import { TypeOrmAccount } from './typeorm/entities/typeorm-account'
import { TypeOrmAccountsRepository } from './typeorm/repository/typeorm-accounts-repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAccount])],
  providers: [
    { useClass: TypeOrmAccountsRepository, provide: AccountsRepository },
  ],
  exports: [AccountsRepository],
})
export class AuthDatabaseModule {}
