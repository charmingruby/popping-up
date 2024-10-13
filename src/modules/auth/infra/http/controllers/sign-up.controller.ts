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
import { ConflictError } from '@/modules/auth/domain/application/errors/conflict-error'
import { SignUpGateway } from '@/modules/auth/domain/application/gateways/sign-up-gateway'

import { Tokenizer } from '../../security/auth/tokenizer'
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
  async signUp(@Body() dto: SignUpDto) {
    const result = await this.useCase.perform(dto)

    if (result.isLeft()) {
      if (result.value instanceof ConflictError) {
        return new UnauthorizedException({ message: result.value.message })
      }

      return new InternalServerErrorException()
    }

    const { accessToken, refreshToken } = await this.tokenizer.generateTokens(
      result.value.accountPayload,
    )

    return { accessToken, refreshToken }
  }
}
