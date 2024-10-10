import { Module } from '@nestjs/common'

import { AuthDatabaseModule } from './infra/database/auth-database.module'

@Module({
  imports: [AuthDatabaseModule],
  controllers: [],
})
export class AuthModule {}
