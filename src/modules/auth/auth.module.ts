import { Module } from '@nestjs/common'

import { AuthDatabaseModule } from './infra/database/auth-database.module'
import { AuthController } from './infra/http/controllers/auth.controller'

@Module({
  imports: [AuthDatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}
