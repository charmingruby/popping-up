import { Module } from '@nestjs/common'

import { SignInGateway } from '../../domain/application/gateways/sign-in-gateway'
import { SignUpGateway } from '../../domain/application/gateways/sign-up-gateway'
import { HasherPort } from '../../domain/application/ports/hasher'
import { SignInUseCase } from '../../domain/application/usecases/sign-in-usecase'
import { SignUpUseCase } from '../../domain/application/usecases/sign-up-usecase'
import { BcryptHasherAdapter } from '../adapters/hasher/bcrypt-adapter'
import { AuthDatabaseModule } from '../database/auth-database.module'
import { Tokenizer } from '../security/auth/tokenizer'
import { SignInController } from './controllers/sign-in.controller'
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
    {
      useClass: SignInUseCase,
      provide: SignInGateway,
    },
  ],
  controllers: [SignUpController, SignInController],
})
export class AuthHttpModule {}
