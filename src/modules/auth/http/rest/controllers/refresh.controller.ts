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
import { InvalidTokenException } from '@/modules/auth/infra/security/auth/tokens/exceptions/invalid-token.exception'
import { Tokenizer } from '@/modules/auth/infra/security/auth/tokens/tokenizer'

import { RefreshDto } from '../dto/refresh.dto'

@Controller()
export class RefreshController {
  constructor(private readonly tokenizer: Tokenizer) {}

  @IsPublic()
  @Post('/auth/refresh')
  @HttpCode(HttpStatus.OK)
  async handle(@Body() dto: RefreshDto) {
    const result = await this.tokenizer.performTokensRotation(dto.refreshToken)

    if (result.isLeft()) {
      if (result.value instanceof InvalidTokenException) {
        throw new UnauthorizedException({ message: result.value.message })
      }

      throw new InternalServerErrorException({ message: result.value.message })
    }

    return {
      accessToken: result.value.accessToken,
      refreshToken: result.value.refreshToken,
    }
  }
}
