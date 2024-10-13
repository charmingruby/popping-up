import { Module } from '@nestjs/common'

import { SignUpGateway } from '../../domain/application/gateways/sign-up-gateway'
import { HasherPort } from '../../domain/application/ports/hasher'
import { SignUpUseCase } from '../../domain/application/usecases/sign-up-usecase'
import { BcryptHasherAdapter } from '../adapters/hasher/bcrypt-adapter'
import { AuthDatabaseModule } from '../database/auth-database.module'
import { Tokenizer } from '../security/auth/tokenizer'
import { SignUpController } from './controllers/sign-up.controller'

@Module({
  imports: [AuthDatabaseModule],
  providers: [
    Tokenizer,
    {
      useClass: BcryptHasherAdapter,
      provide: HasherPort,
    },
    {
      useClass: SignUpUseCase,
      provide: SignUpGateway,
    },
  ],
  controllers: [SignUpController],
})
export class AuthHttpModule {}
