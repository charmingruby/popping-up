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

import { InvalidTokenError } from '../../security/auth/tokens/errors/invalid-token-error'
import { Tokenizer } from '../../security/auth/tokens/tokenizer'
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
      if (result.value instanceof InvalidTokenError) {
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
