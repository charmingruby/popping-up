import { Module } from '@nestjs/common'

import { SignInGateway } from '../../core/application/gateways/sign-in.gateway'
import { SignUpGateway } from '../../core/application/gateways/sign-up.gateway'
import { HasherPort } from '../../core/application/ports/hasher.port'
import { SignInUseCase } from '../../core/application/usecases/sign-in.usecase'
import { SignUpUseCase } from '../../core/application/usecases/sign-up.usecase'
import { BcryptHasherAdapter } from '../../infra/hasher/bcrypt.adapter'
import { Tokenizer } from '../../infra/security/auth/tokens/tokenizer'
import { AuthDatabaseModule } from '../../infra/typeorm/auth-typeorm.module'
import { RefreshController } from './controllers/refresh.controller'
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
  controllers: [SignUpController, SignInController, RefreshController],
})
export class AuthRestModule {}
