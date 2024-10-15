import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common'

import { IsPublic } from '@/common/decorators/is-public'

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
      return new UnauthorizedException({ message: result.value.message })
    }

    return {
      accessToken: result.value.accessToken,
      refreshToken: result.value.refreshToken,
    }
  }
}
