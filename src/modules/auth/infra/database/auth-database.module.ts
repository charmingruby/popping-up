import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountsRepository } from '../../domain/application/repositories/accounts-repository'
import { TypeORMAccount } from './typeorm/entities/typeorm-account'
import { TypeORMAccountsRepository } from './typeorm/repository/typeorm-accounts-repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeORMAccount])],
  providers: [
    { useClass: TypeORMAccountsRepository, provide: AccountsRepository },
  ],
  exports: [AccountsRepository],
})
export class AuthDatabaseModule {}
