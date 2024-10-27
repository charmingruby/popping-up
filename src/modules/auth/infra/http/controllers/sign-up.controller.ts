import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'

import { ConflictException } from '@/common/core/exceptions/conflict.exception'
import { IsPublic } from '@/common/decorators/is-public'
import { SignUpGateway } from '@/modules/auth/domain/application/gateways/sign-up.gateway'

import { Tokenizer } from '../../security/auth/tokens/tokenizer'
import { SignUpDto } from '../dto/sign-up.dto'

@Controller()
export class SignUpController {
  constructor(
    private readonly tokenizer: Tokenizer,
    private readonly useCase: SignUpGateway,
  ) {}

  @IsPublic()
  @Post('/auth/signup')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() dto: SignUpDto) {
    const result = await this.useCase.perform(dto)

    if (result.isLeft()) {
      if (result.value instanceof ConflictException) {
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
