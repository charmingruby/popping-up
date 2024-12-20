import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'

import { IsPublic } from '@/common/decorators/is-public'
import { InvalidCredentialsException } from '@/modules/auth/core/application/exceptions/invalid-credentials.exception'
import { SignInGateway } from '@/modules/auth/core/application/gateways/sign-in.gateway'
import { Tokenizer } from '@/modules/auth/infra/security/auth/tokens/tokenizer'

import { SignInDto } from '../dto/sign-in.dto'

@Controller()
export class SignInController {
  constructor(
    private readonly tokenizer: Tokenizer,
    private readonly useCase: SignInGateway,
  ) {}

  @IsPublic()
  @Post('/auth/signin')
  @HttpCode(HttpStatus.OK)
  async handle(@Body() dto: SignInDto) {
    const result = await this.useCase.perform(dto)

    if (result.isLeft()) {
      if (result.value instanceof InvalidCredentialsException) {
        throw new UnauthorizedException({ message: result.value.message })
      }

      throw new InternalServerErrorException()
    }

    const tokensResult = await this.tokenizer.performTokensGeneration(
      result.value.accountPayload,
    )
    if (tokensResult.isLeft()) {
      throw new InternalServerErrorException()
    }

    return {
      accessToken: tokensResult.value.accessToken,
      refreshToken: tokensResult.value.refreshToken,
    }
  }
}
