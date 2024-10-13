import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AccountPayload } from '@/modules/auth/domain/application/logic/account-payload'

@Injectable()
export class Tokenizer {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: AccountPayload): Promise<{
    refreshToken: string
    accessToken: string
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ])

    return { accessToken, refreshToken }
  }

  async generateAccessToken(payload: AccountPayload) {
    return await this.jwtService.signAsync(
      {
        sub: payload.accountId,
        payload: {
          email: payload.email,
          username: payload.username,
        },
      },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: '15m',
      },
    )
  }

  async generateRefreshToken(payload: AccountPayload) {
    return await this.jwtService.signAsync(
      {
        sub: payload.accountId,
        payload: {
          email: payload.email,
          username: payload.username,
        },
      },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: '7d',
      },
    )
  }
}
